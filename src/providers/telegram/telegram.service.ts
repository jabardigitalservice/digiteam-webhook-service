import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Api, TelegramClient } from 'telegram'
import { HttpService } from '@nestjs/axios'
import random from 'random-bigint'

@Injectable()
export class TelegramService {
  private url = this.configService.get('url.telegram')

  constructor(private configService: ConfigService, private httpService: HttpService) {}

  public sendMessageWithBot = async (bot: string, chatId: number, message: string) => {
    if (!message) return
    const url = `${this.url}/${bot}/sendMessage`
    this.httpService.axiosRef.post(url, {
      chat_id: chatId,
      text: message,
    })
  }

  public sendPhotoWithBot = async (
    bot: string,
    chatId: number,
    picture?: string
  ): Promise<number> => {
    if (!picture) return null

    const response = await this.httpService.axiosRef.postForm(`${this.url}/${bot}/sendPhoto`, {
      chat_id: chatId,
      photo: picture,
    })

    if (response.status !== 200) return null

    const { message_id: messageId } = response.data.result
    return Number(messageId)
  }

  public sendMessageWithUser = async (
    telegramClient: TelegramClient,
    chatId: number,
    message: string,
    replyToMsgId?: number
  ) => {
    if (!message) return
    if (telegramClient.disconnected) await telegramClient.connect()
    telegramClient.invoke(
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
