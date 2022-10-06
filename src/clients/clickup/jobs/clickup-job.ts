import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { ClickupTaskMoved } from 'src/interface/clickup-task-moved.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { ClickupService } from '../clickup.service'
import { Clickup } from '../interface/clickup.interface'
import { PayloadService } from '../services/payload/payload.service'

@Injectable()
@Processor('clickup')
export class ClickupJob {
  constructor(
    private clickupService: ClickupService,
    private payloadService: PayloadService,
    private telegramService: TelegramService,
    private elasticService: ElasticService
  ) {}

  @Process('event-task-moved')
  async eventMerge(job: Job) {
    const payload = job.data as ClickupTaskMoved
    const task = await this.clickupService.GetTaskByID(payload.task_id)

    const clickup: Clickup = {
      url: task.url,
      description: task.description,
    }

    const evidence = await this.payloadService.getEvidence(clickup)
    this.telegramService.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)

    await job.finished()
  }
}
