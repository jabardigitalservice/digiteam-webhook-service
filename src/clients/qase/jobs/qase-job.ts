import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { QaseTest } from 'src/interface/qase-test.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { Qase } from '../interface/qase.interface'
import { QaseService } from '../qase.service'

@Injectable()
@Processor('qase')
export class QaseJob {
  constructor(private qaseService: QaseService, private elasticService: ElasticService) {}

  @Process('event-qase')
  async eventMerge(job: Job) {
    const payload = job.data as QaseTest
    const qase: Qase = {
      description: payload.payload.description,
      project_code: payload.project_code,
      event_name: payload.event_name,
    }

    const evidence = await this.qaseService.getEvidence(qase)
    this.qaseService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
    return job.finished()
  }
}
