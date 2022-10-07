import { Process, Processor } from '@nestjs/bull'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bull'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
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
    const task = await this.clickupService.GetTaskByID(payload.task_id)
    
    const statuses = this.configService.get('clickup.statuses') as string[]
    const status = task.status.status.toUpperCase().trim()
    if (!statuses.includes(status)) return job.remove()

    const clickup: Clickup = {
      url: task.url,
      description: task.description,
    }

    const evidence = await this.clickupService.getEvidence(clickup)
    this.clickupService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)

    return job.finished()
  }
}
