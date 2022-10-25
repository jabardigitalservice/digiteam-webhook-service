import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { UserService } from 'src/providers/telegram/user.service'

@Injectable()
export class HttpService {
  constructor(
    private telegramService: TelegramService,
    private screenshotService: ScreenshotService,
    private userService: UserService
  ) {}

  evidence = async (evidence: Evidence) => {
    evidence.participants = await this.userService.getUsers(evidence.participants)
    const message = this.telegramService.formatDefault(evidence)
    const url = evidence.screenshot ? evidence.screenshot : evidence.url
    const picture = await this.screenshotService.screenshot(url)
    const messageId = await this.telegramService.sendPhotoWithBot(picture)

    if (picture && messageId) {
      this.telegramService.sendMessageWithUser(message, messageId)
      return
    }

    this.telegramService.sendMessageWithBot(message)
  }
}
