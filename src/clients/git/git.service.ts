import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { Git } from './interface/git.interface'
import { HttpService } from 'src/receivers/http/http.service'

@Injectable()
export class GitService {
  constructor(
    private telegramService: TelegramService,
    private elasticService: ElasticService,
    private evidenceService: EvidenceService,
    private screenshotService: ScreenshotService,
    private httpService: HttpService
  ) {}

  send = async (git: Git, source: string, isPrivateRepo: boolean = true) => {
    const evidence = await this.getEvidence(git, source)
    this.sendEvidence(evidence, isPrivateRepo)
    this.elasticService.createElasticEvidence(evidence)
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

  public sendEvidence = async (evidence: Evidence, isPrivateRepo: boolean): Promise<void> => {
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

    if (!isPrivateRepo) return this.httpService.evidence(evidence)

    this.telegramService.sendMessageWithBot(messageByCreated)
    this.telegramService.sendMessageWithBot(messageByReview)
  }
}
