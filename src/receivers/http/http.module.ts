import { Module } from '@nestjs/common'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { HttpController } from './http.controller'
import { HttpService } from './http.service'

@Module({
  imports: [TelegramModule, ScreenshotModule],
  controllers: [HttpController],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
