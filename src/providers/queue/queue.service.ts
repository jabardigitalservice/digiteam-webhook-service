import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { JobOptions, Queue } from 'bull'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('gitlab') private gitlab: Queue,
    @InjectQueue('github') private github: Queue
  ) {}

  queueOptions: JobOptions = {
    delay: 10000,
    attempts: 1,
    priority: 1,
    removeOnFail: true,
    removeOnComplete: true,
    backoff: 5000,
    timeout: 30000,
  }

  eventMergeGithub = (data: any) => {
    this.github.add('event-merge-git', data, this.queueOptions)
  }

  eventMergeGitlab = (data: any) => {
    this.gitlab.add('event-merge-git', data, this.queueOptions)
  }
}
