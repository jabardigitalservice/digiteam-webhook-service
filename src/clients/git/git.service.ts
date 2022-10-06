import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'

@Injectable()
export class GitService {
  private telegramClient: TelegramClient
  private chatID = this.configService.get('telegram.chatID')
  private bot = this.configService.get('telegram.bot')

  constructor(
    private configService: ConfigService,
    private screenshotService: ScreenshotService,
    private telegramService: TelegramService,
    private elasticService: ElasticService
  ) {
    const stringSession = new StringSession(this.configService.get('telegram.user.session'))

    this.telegramClient = new TelegramClient(
      stringSession,
      Number(this.configService.get('telegram.user.id')),
      this.configService.get('telegram.user.hash'),
      {}
    )
  }

  private sendMessageWithUser = async (
    messageByCreated: string,
    messageByReview: string,
    messageId: number
  ) => {
    this.telegramService.sendMessageWithUser(
      this.telegramClient,
      this.chatID,
      messageByCreated,
      messageId
    )

    this.telegramService.sendMessageWithUser(
      this.telegramClient,
      this.chatID,
      messageByReview,
      messageId
    )
  }

  public sendTelegram = async (evidence: Evidence): Promise<void> => {
    const messageByCreated = this.telegramService.formatByCreated(evidence)
    const messageByReview = this.telegramService.formatByReview(evidence)
    const url = evidence.screenshot ? evidence.screenshot : evidence.url
    const picture = await this.screenshotService.screenshot(url)
    const messageId = await this.telegramService.sendPhotoWithBot(this.bot, this.chatID, picture)

    if (picture && messageId) {
      return this.sendMessageWithUser(messageByCreated, messageByReview, messageId)
    }

    this.telegramService.sendMessageWithBot(this.bot, this.chatID, messageByCreated)
    this.telegramService.sendMessageWithBot(this.bot, this.chatID, messageByReview)
  }

  public createElastic = async (payload: Evidence): Promise<void> => {
    const { participants } = payload
    delete payload.source.createdBy
    for (const participant of participants) {
      if (!participant) continue
      this.elasticService.create({
        project: payload.project.trimEnd(),
        participant,
        ...payload.source,
        isBodyValid: true,
      })
    }
  }
}
