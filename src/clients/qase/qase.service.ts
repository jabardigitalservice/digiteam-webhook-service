import { Injectable } from '@nestjs/common'
import { source } from 'src/common/helpers/source'
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
  }

  public getEvidence = async (qase: Qase): Promise<Evidence> => {
    const evidence = await this.evidenceService.getEvidence(qase.description)
    evidence.source = {
      ...qase,
      source: source.QASE,
    }
    evidence.url = evidence.attachment
    return evidence
  }

  public sendEvidence = async (evidence: Evidence): Promise<void> => {
    const message = this.telegramService.formatDefault(evidence)
    const picture = await this.screenshotService.screenshot(evidence.screenshot)

    if (picture) {
      this.telegramService.sendPhotoWithChannel(picture, message)
      return
    }

    this.telegramService.sendMessageWithChannel(message)
  }
}
