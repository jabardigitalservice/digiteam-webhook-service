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
    private screenshotService: ScreenshotService,
  ) {}

  send = async (git: Git, source: string) => {
    const evidence = await this.getEvidence(git, source)
    this.sendEvidence(evidence)
  }

  public getEvidence = async (git: Git, source: string): Promise<Evidence> => {
    const evidence = await this.evidenceService.getEvidence(git.description)
    evidence.source = {
      ...git,
      source: source,
    }
    evidence.url = git.url
    return evidence
  }

  public sendEvidence = async (evidence: Evidence): Promise<void> => {
    const messageByCreated = this.telegramService.formatByCreated(evidence)
    const messageByReview = this.telegramService.formatByReview(evidence)
    const url = evidence.screenshot ? evidence.screenshot : evidence.url

    const picture = await this.screenshotService.screenshot(url)

    if (picture) {
      this.telegramService.sendPhotoWithChannel(picture, messageByCreated)
      this.telegramService.sendPhotoWithChannel(picture, messageByReview)
      return
    }

    this.telegramService.sendMessageWithChannel(messageByCreated)
    this.telegramService.sendMessageWithChannel(messageByReview)
  }
}
