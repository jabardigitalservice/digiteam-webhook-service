import { Module } from '@nestjs/common'
import { TelegramModule } from '../telegram/telegram.module'
import { EvidenceService } from './evidence.service'

@Module({
  imports: [TelegramModule],
  providers: [EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
