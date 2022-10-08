import { Injectable } from '@nestjs/common'
import { QaseTest } from 'src/interface/qase-test.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class QaseService {
  constructor(private queue: QueueService) {}

  qase = (body: QaseTest) => {
    return this.queue.eventQase(body)
  }
}
