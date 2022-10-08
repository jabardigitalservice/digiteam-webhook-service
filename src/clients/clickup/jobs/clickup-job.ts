import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bull'
import moment from 'moment'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { ClickupService } from '../clickup.service'
import { Clickup } from '../interface/clickup.interface'

@Injectable()
@Processor('clickup')
export class ClickupJob {
  constructor(
    private clickupService: ClickupService,
    private elasticService: ElasticService,
    private configService: ConfigService
  ) {}

  @Process('event-task-status-updated')
  async eventMerge(job: Job) {
    const payload = job.data as ClickupTaskStatusUpdated
    const task = await this.clickupService.getTaskByID(payload.task_id)

    const statuses = this.configService.get('clickup.statuses') as string[]
    const status = task.status.status.toUpperCase().trim()
    if (!statuses.includes(status)) return job.remove()

    const assignees = task.assignees.map((item) => item.username)
    const clickup: Clickup = {
      url: task.url,
      description: task.description,
      createdAt: moment().toISOString(),
    }

    const evidence = await this.clickupService.getEvidence(clickup, assignees)
    this.clickupService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)

    return job.finished()
  }
}
