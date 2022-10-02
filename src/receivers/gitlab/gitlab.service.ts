import { ForbiddenException, Injectable } from '@nestjs/common'
import { GitlabMerge } from 'src/interface/gitlab-merge.interface'
import { QueueService } from 'src/providers/queue/queue.service'

@Injectable()
export class GitlabService {
  constructor(private queue: QueueService) {}
  eventMerge = (body: GitlabMerge) => {
    if (body.object_attributes.action !== 'merge') {
      throw new ForbiddenException()
    }

    return this.queue.eventMergeGitlab(body)
  }
}
