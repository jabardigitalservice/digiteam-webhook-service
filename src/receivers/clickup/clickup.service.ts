import { Injectable } from '@nestjs/common'
import { ClickupTaskMoved } from 'src/interface/clickup-task-moved.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class ClickupService {
  constructor(private queue: QueueService) {}

  taskMoved = (body: ClickupTaskMoved) => {
    return this.queue.eventTaskMovedClickup(body)
  }
}
