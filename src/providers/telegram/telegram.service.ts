import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Api, TelegramClient } from 'telegram'
import { HttpService } from '@nestjs/axios'
import random from 'random-bigint'
import { Evidence } from 'src/interface/evidence.interface'
import { StringSession } from 'telegram/sessions'
import { ScreenshotService } from '../screenshot/screenshot.service'

@Injectable()
export class TelegramService {
  private url = this.configService.get('url.telegram')
  private chatID = this.configService.get('telegram.chatID')
  private bot = this.configService.get('telegram.bot')
  private client: TelegramClient

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    const stringSession = new StringSession(this.configService.get('telegram.user.session'))

    this.client = new TelegramClient(
      stringSession,
      Number(this.configService.get('telegram.user.id')),
      this.configService.get('telegram.user.hash'),
      {}
    )
  }

  public sendMessageWithBot = async (message: string) => {
    if (!message) return
    const url = `${this.url}/${this.bot}/sendMessage`
    this.httpService.axiosRef.post(url, {
      chat_id: this.chatID,
      text: message,
    })
  }

  public sendPhotoWithBot = async (picture?: string): Promise<number> => {
    if (!picture) return null

    try {
      const response = await this.httpService.axiosRef.postForm(
        `${this.url}/${this.bot}/sendPhoto`,
        {
          chat_id: this.chatID,
          photo: picture,
        }
      )
      const { message_id: messageId } = response.data.result
      return Number(messageId)
    } catch (error) {
      return null
    }
  }

  public sendMessageWithUser = async (message: string, replyToMsgId?: number) => {
    if (!message) return
    if (this.client.disconnected) await this.client.connect()
    this.client.invoke(
      new Api.messages.SendMessage({
        peer: this.chatID,
        message,
        randomId: random(128),
        noWebpage: true,
        replyToMsgId,
      })
    )
  }

  public formatByCreated = (evidence: Evidence): string => {
    const message = `
  /lapor ${evidence.project} | ${evidence.title}
Peserta: ${evidence.participants[0]}
Lampiran: ${evidence.url}
${evidence.date ? `Tanggal: ${evidence.date}` : ''}
`
    return evidence.participants[0] ? message : null
  }

  public formatByReview = (evidence: Evidence): string => {
    const message = `
/lapor ${evidence.project} | Peer code review ${evidence.title}
Peserta: ${evidence.participants.slice(1).join('  ')}
Lampiran: ${evidence.url}
${evidence.date ? `Tanggal: ${evidence.date}` : ''}
`
    return evidence.participants.slice(1).length ? message : null
  }

  public formatDefault = (evidence: Evidence): string => {
    const message = `
/lapor ${evidence.project} | ${evidence.title}
Peserta: ${evidence.participants}
Lampiran: ${evidence.url}
${evidence.date ? `Tanggal: ${evidence.date}` : ''}
`
    return evidence.participants.length ? message : null
  }
}
