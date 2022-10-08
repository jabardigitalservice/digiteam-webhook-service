import { Injectable } from '@nestjs/common'
import { QaseCaseCreated } from 'src/interface/qase-case-created.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class QaseService {
  constructor(private queue: QueueService) {}

  caseCreated = (body: QaseCaseCreated) => {
    return this.queue.eventCaseCreatedQase(body)
  }
}
