import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ScreenshotModule } from '../screenshot/screenshot.module'
import { TelegramService } from './telegram.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ScreenshotModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
