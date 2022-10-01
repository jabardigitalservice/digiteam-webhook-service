import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ScreenshotService } from './screenshot.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ScreenshotService],
  exports: [ScreenshotService],
})
export class ScreenshotModule {}
