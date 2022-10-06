import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class ClickupService {
  constructor(private queue: QueueService, private configService: ConfigService) {}

  taskStatusUpdated = (body: ClickupTaskStatusUpdated) => {
    return this.queue.eventTaskStatusUpdated(body)
  }
}
