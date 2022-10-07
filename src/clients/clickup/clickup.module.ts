import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ClickupService } from './clickup.service'
import { ClickupJob } from './jobs/clickup-job'
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
  providers: [ClickupService, ClickupJob],
})
export class ClickupModule {}
