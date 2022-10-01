import { InjectQueue } from '@nestjs/bull'
import { HttpCode, Injectable } from '@nestjs/common'
import { Queue } from 'bull'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('gitlab') private gitlab: Queue,
    @InjectQueue('github') private github: Queue,
  ) {}

  gitOptions = {
    delay: 10000,
    attempts: 1,
    priority: 1,
    backoff: 5000,
    timeout: 30000,
  }

  eventMergeGithub = (data: any) => {
    this.github.add('event-merge-digiteam', data, this.gitOptions)
  }

  eventMergeGitlab = (data: any) => {
    this.gitlab.add('event-merge-digiteam', data, this.gitOptions)
  }
}
