import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { BodyInterface, Rows } from './interface/digiteam.interface'

@Injectable()
export class DigiteamService {
  private chatID = this.configService.get('telegram.chatID')
  private bot = this.configService.get('telegram.bot')

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    private screenshotService: ScreenshotService,
    private telegramService: TelegramService,
    private elasticService: ElasticService,
  ) {}

  searchRows = (
    rows: Rows[],
    isFound: boolean,
    user: string
  ): {
    result: string
    isFound: boolean
  } => {
    let result = user
    for (const row of rows) {
      if (row.git === user) {
        result = row.telegram
        isFound = true
        break
      }
    }
    return {
      result,
      isFound,
    }
  }

  mapping = (rows: Rows[], users: string[]): string[] => {
    const result = []
    for (const user of users) {
      const isFound = false
      const rowSearch = this.searchRows(rows, isFound, user)
      if (!rowSearch.isFound) result.push(user)
      else result.push(rowSearch.result)
    }
    return result
  }

  async users(participants: string) {
    const users: string[] = participants.trimEnd().split(/[ ,]+/)

    if (!(await this.cache.get('users'))) {
      const response = await this.httpService.axiosRef.get(
        this.configService.get('url.gitUsername')
      )
      if (response.status !== 200) {
        return users
      }
      await this.cache.set('users', JSON.stringify(response.data.rows))
    }

    const rows: Rows[] = await this.cache.get('users')

    return this.mapping(rows, users)
  }

  regex = (string: string): RegExp => new RegExp(string, 'i')

  bodyRegex = {
    project: this.regex('project: (.+)'),
    title: this.regex('title: (.+)'),
    participants: this.regex('participants: (.+)'),
    date: this.regex('date: (.+)'),
    screenshot: this.regex('screenshot: (.+)'),
  }

  getBody = (body: any) => {
    let isValidBody = true
    for (const item in body) {
      if (body[item] === null) {
        isValidBody = false
        break
      }
      body[item] = body[item][1]
    }
    body.isValidBody = isValidBody

    return body
  }

  body = async (payload: any): Promise<BodyInterface> => {
    const body = this.getBody({
      project: this.bodyRegex.project.exec(payload.body),
      title: this.bodyRegex.title.exec(payload.body),
      participants: this.bodyRegex.participants.exec(payload.body),
    })

    const date = this.bodyRegex.date.exec(payload.body)
    body.date = date ? date[1] : null
    const screenshot = this.bodyRegex.screenshot.exec(payload.body)
    body.screenshot = screenshot ? screenshot[1] : null

    delete payload.body

    if (!body.isValidBody) throw Error()

    body.participants = await this.users(body.participants)

    body.addition = payload
    body.url = payload.url
    return body
  }

  formatByCreated = (payload: BodyInterface): string | null => {
    const message = `
  /lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants[0]}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
    return payload.participants[0] ? message : null
  }

  formatByReview = (payload: BodyInterface): string | null => {
    const message = `
/lapor ${payload.project} | Peer code review ${payload.title}
Peserta: ${payload.participants.slice(1).join('  ')}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
    return payload.participants.slice(1).length ? message : null
  }

  sendTelegram = async (payload: BodyInterface): Promise<void> => {
    const messageByCreated = this.formatByCreated(payload)
    const messageByReview = this.formatByReview(payload)
    const url = payload.screenshot ? payload.screenshot : payload.url
    const picture = await this.screenshotService.screenshot(url)
    const messageId = await this.telegramService.sendPhotoWithBot(this.bot, this.chatID, picture)

    if (picture && messageId) {
      this.telegramService.sendMessageWithUser(this.chatID, messageByCreated, messageId)
      this.telegramService.sendMessageWithUser(this.chatID, messageByReview, messageId)
      return
    }

    this.telegramService.sendMessageWithBot(this.bot, this.chatID, messageByCreated)
    this.telegramService.sendMessageWithBot(this.bot, this.chatID, messageByReview)
    this.createElastic(payload)
  }

  createElastic = (payload: BodyInterface): void => {
    const { participants } = payload
    delete payload.addition.createdBy
    for (const participant of participants) {
      if (!participant) continue
      this.elasticService.create({
        project: payload.project.trimEnd(),
        participant,
        ...payload.addition,
        isBodyValid: true,
      })
    }
  }
}
