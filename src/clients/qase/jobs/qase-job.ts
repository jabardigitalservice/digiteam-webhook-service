import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { QaseCaseCreated } from 'src/interface/qase-case-created.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { Qase } from '../interface/qase.interface'
import { QaseService } from '../qase.service'

@Injectable()
@Processor('qase')
export class QaseJob {
  constructor(private qaseService: QaseService, private elasticService: ElasticService) {}

  @Process('event-case-created')
  async eventMerge(job: Job) {
    const payload = job.data as QaseCaseCreated
    const qase: Qase = {
      description: payload.payload.description,
      createdAt: moment().toISOString(),
    }

    const evidence = await this.qaseService.getEvidence(qase)
    this.qaseService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
    return job.finished()
  }
}
