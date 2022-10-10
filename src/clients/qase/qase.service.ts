import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { Qase } from './interface/qase.interface'

@Injectable()
export class QaseService {
  constructor(
    private evidenceService: EvidenceService,
    private telegramService: TelegramService,
    private screenshotService: ScreenshotService,
    private elasticService: ElasticService
  ) {}

  send = async (qase: Qase) => {
    const evidence = await this.getEvidence(qase)
    this.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
  }

  public getEvidence = async (qase: Qase): Promise<Evidence> => {
    const evidence = await this.evidenceService.getEvidence(qase.description)
    delete qase.description
    evidence.source = {
      ...qase,
      source: 'qase',
    }
    evidence.url = evidence.attachment
    return evidence
  }

  public sendEvidence = async (evidence: Evidence): Promise<void> => {
    const message = this.telegramService.formatDefault(evidence)
    const picture = await this.screenshotService.screenshot(evidence.screenshot)
    const messageId = await this.telegramService.sendPhotoWithBot(picture)

    if (picture && messageId) {
      this.telegramService.sendMessageWithUser(message, messageId)
      return
    }

    this.telegramService.sendMessageWithBot(message)
  }
}
