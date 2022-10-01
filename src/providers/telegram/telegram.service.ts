import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { HttpService } from '@nestjs/axios'
import random from 'random-bigint'

@Injectable()
export class TelegramService {
  private client: TelegramClient
  private url = this.configService.get('url.telegram')

  constructor(private configService: ConfigService, private httpService: HttpService) {
    const stringSession = new StringSession(this.configService.get('telegram.user.session'))

    this.client = new TelegramClient(
      stringSession,
      Number(this.configService.get('telegram.user.id')),
      this.configService.get('telegram.user.hash'),
      {}
    )
  }

  sendMessageWithBot = async (bot: string, chatId: number, message: string) => {
    const url = `${this.url}/${bot}/sendMessage`
    this.httpService.axiosRef.post(url, {
      chat_id: chatId,
      text: message,
    })
  }

  sendPhotoWithBot = async (
    bot: string,
    chatId: number,
    picture?: string
  ): Promise<number | null> => {
    if (!picture) return null

    const response = await this.httpService.axiosRef.postForm(`${this.url}/${bot}/sendPhoto`, {
      chat_id: chatId,
      photo: picture,
    })

    if (response.status !== 200) return null

    const { message_id: messageId } = response.data.result
    return Number(messageId)
  }

  sendMessageWithUser = async (chatId: number, message: string, replyToMsgId?: number) => {
    if (this.client.disconnected) await this.client.connect()
    return this.client.invoke(
      new Api.messages.SendMessage({
        peer: chatId,
        message,
        randomId: random(128),
        noWebpage: true,
        replyToMsgId,
      })
    )
  }
}
