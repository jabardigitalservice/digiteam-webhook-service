import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bull'
import { ClickupTaskCommentPosted } from 'src/interface/clickup-task-comment-posted.interface'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { ClickupService } from '../clickup.service'
import { Clickup } from '../interface/clickup.interface'

@Injectable()
@Processor('clickup')
export class ClickupJob {
  constructor(private clickupService: ClickupService, private configService: ConfigService) {}

  @Process('event-task-status-updated')
  async eventTaskStatusUpdated(job: Job) {
    const payload = job.data as ClickupTaskStatusUpdated
    const task = await this.clickupService.getTaskByID(payload.task_id)

    const statuses = this.configService.get('clickup.statuses') as string[]
    const status = task.status.status.toUpperCase().trim()
    if (!statuses.includes(status)) return job.remove()

    const assignees = task.assignees.map((item) => item.username)
    const clickup: Clickup = {
      url: task.url,
      description: task.description,
      event: payload.event,
    }

    this.clickupService.send(clickup, assignees)

    return job.finished()
  }

  @Process('event-task-comment-posted')
  async eventTaskCommentPosted(job: Job) {
    const payload = job.data as ClickupTaskCommentPosted

    const description = payload.history_items[0].comment.text_content
    const assignees = this.clickupService.getAssigneesEventComment(description)

    const task = await this.clickupService.getTaskByID(payload.task_id)

    const clickup: Clickup = {
      url: task.url,
      description,
      event: payload.event,
    }

    this.clickupService.send(clickup, assignees)

    return job.finished()
  }
}
