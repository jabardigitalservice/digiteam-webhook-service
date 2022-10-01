import { ForbiddenException, Injectable } from '@nestjs/common'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class GithubService {
  constructor(private queue: QueueService) {}
  eventMerge = (body: any) => {
    if (body.action !== 'closed' || !body.pull_request.merged) {
      throw new ForbiddenException()
    }

    return this.queue.eventMergeGithub(body)
  }
}
