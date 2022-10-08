import { Injectable } from '@nestjs/common'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class ClickupService {
  constructor(private queue: QueueService) {}

  taskStatusUpdated = (body: ClickupTaskStatusUpdated) => {
    return this.queue.eventTaskStatusUpdatedClickup(body)
  }
}
