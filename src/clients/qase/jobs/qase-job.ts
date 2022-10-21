import { OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { source } from 'src/common/helpers/source'
import { QaseTest } from 'src/interface/qase-test.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { Qase } from '../interface/qase.interface'
import { QaseService } from '../qase.service'

@Injectable()
@Processor(source.QASE)
export class QaseJob {
  constructor(private qaseService: QaseService, private elasticService: ElasticService) {}

  @Process('event-qase')
  async eventMerge(job: Job) {
    const payload = job.data as QaseTest
    const qase: Qase = {
      description: decodeURIComponent(
        payload.payload.description.replace(new RegExp('\\\\', 'g'), '')
      ),
      project_code: payload.project_code,
      event_name: payload.event_name,
    }
    await job.progress(50)
    await this.qaseService.send(qase)
    await job.progress(100)
    return job.moveToCompleted()
  }

  @OnQueueFailed()
  onQueueFailed(job: Job) {
    this.elasticService.create({
      isValid: false,
      source: {
        ...job.data,
        source: source.QASE,
      },
    })
  }
}
