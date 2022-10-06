import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { Git } from './interface/git.interface'

@Injectable()
export class GitService {
  constructor(
    private telegramService: TelegramService,
    private elasticService: ElasticService,
    private evidenceService: EvidenceService
  ) {}

  createEvidence = async (git: Git) => {
    const evidence = await this.getEvidence(git)
    this.telegramService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
  }

  public getEvidence = async (git: Git): Promise<Evidence> => {
    const evidence = await this.evidenceService.GetEvidence(git.description)
    delete git.description
    evidence.source = git
    evidence.url = git.url
    return evidence
  }
}
