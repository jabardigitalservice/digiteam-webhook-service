import { Process, Processor } from '@nestjs/bull'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bull'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { ClickupService } from '../clickup.service'
import { Clickup } from '../interface/clickup.interface'

@Injectable()
@Processor('clickup')
export class ClickupJob {
  constructor(
    private clickupService: ClickupService,
    private telegramService: TelegramService,
    private elasticService: ElasticService,
    private configService: ConfigService
  ) {}

  @Process('event-task-status-updated')
  async eventMerge(job: Job) {
    const payload = job.data as ClickupTaskStatusUpdated
    const task = await this.clickupService.GetTaskByID(payload.task_id)

    const statuses = this.configService.get('click.statuses') as string[]
    if (!statuses.includes(task.status.status)) return job.remove()

    const clickup: Clickup = {
      url: task.url,
      description: task.description,
    }

    const evidence = await this.clickupService.getEvidence(clickup)
    this.telegramService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)

    return job.finished()
  }
}
