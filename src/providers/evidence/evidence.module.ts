import { Module } from '@nestjs/common'
import { EvidenceService } from './evidence.service'

@Module({
  providers: [EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
