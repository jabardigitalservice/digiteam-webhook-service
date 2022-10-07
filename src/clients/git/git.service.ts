import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { Git } from './interface/git.interface'

@Injectable()
export class GitService {
  constructor(
    private telegramService: TelegramService,
    private elasticService: ElasticService,
    private evidenceService: EvidenceService,
    private screenshotService: ScreenshotService
  ) {}

  createEvidence = async (git: Git) => {
    const evidence = await this.getEvidence(git)
    this.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
  }

  public getEvidence = async (git: Git): Promise<Evidence> => {
    const evidence = await this.evidenceService.GetEvidence(git.description)
    delete git.description
    evidence.source = git
    evidence.url = git.url
    return evidence
  }

  public sendEvidence = async (evidence: Evidence): Promise<void> => {
    const messageByCreated = this.telegramService.formatByCreated(evidence)
    const messageByReview = this.telegramService.formatByReview(evidence)
    const url = evidence.screenshot ? evidence.screenshot : evidence.url

    const picture = await this.screenshotService.screenshot(url)
    const messageId = await this.telegramService.sendPhotoWithBot(picture)

    if (picture && messageId) {
      this.telegramService.sendMessageWithUser(messageByCreated, messageId)
      this.telegramService.sendMessageWithUser(messageByReview, messageId)
      return
    }

    this.telegramService.sendMessageWithBot(messageByCreated)
    this.telegramService.sendMessageWithBot(messageByReview)
  }
}
