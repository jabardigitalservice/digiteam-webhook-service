import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { Git } from './interface/git.interface'
import { PayloadService } from './services/payload/payload.service'

@Injectable()
export class GitService {
  constructor(
    private telegramService: TelegramService,
    private elasticService: ElasticService,
    private payloadService: PayloadService
  ) {}

  createEvidence = async (git: Git) => {
    const evidence = await this.payloadService.getEvidence(git)
    this.telegramService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
  }
}
