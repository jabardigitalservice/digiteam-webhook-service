import { Injectable } from '@nestjs/common'
import { ClickupTaskCommentPosted } from 'src/interface/clickup-task-comment-posted.interface'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class ClickupService {
  constructor(private queue: QueueService) {}

  taskStatusUpdated = (body: ClickupTaskStatusUpdated) => {
    return this.queue.eventClickup('event-task-status-updated', body)
  }

  taskCommentPosted = (body: ClickupTaskCommentPosted) => {
    return this.queue.eventClickup('event-task-comment-posted', body)
  }
}
