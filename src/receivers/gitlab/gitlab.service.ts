import { ForbiddenException, Injectable } from '@nestjs/common'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class GitlabService {
  constructor(private queue: QueueService) {}
  eventMerge = (body: any) => {
    if (body.object_attributes.action !== 'merge') {
      throw new ForbiddenException()
    }

    return this.queue.eventMergeGitlab(body)
  }
}
