import { Module } from '@nestjs/common'
import { QaseService } from './qase.service'
import { QaseJob } from './jobs/qase-job'
import { HttpModule } from '@nestjs/axios'
import { EvidenceModule } from 'src/providers/evidence/evidence.module'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { ElasticModule } from 'src/providers/elastic/elastic.module'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EvidenceModule,
    TelegramModule,
    ElasticModule,
    ScreenshotModule,
  ],
  providers: [QaseService, QaseJob],
})
export class QaseModule {}
