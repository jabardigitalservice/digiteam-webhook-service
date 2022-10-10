import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { JobOptions, Queue } from 'bull'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('gitlab') private gitlab: Queue,
    @InjectQueue('github') private github: Queue,
    @InjectQueue('clickup') private clickup: Queue,
    @InjectQueue('qase') private qase: Queue
  ) {}

  queueOptions: JobOptions = {
    delay: 10000,
    attempts: 1,
    removeOnFail: true,
    removeOnComplete: true,
    timeout: 30000,
    lifo: true,
  }

  eventMergeGithub = (data: any) => {
    this.github.add('event-merge', data, this.queueOptions)
  }

  eventMergeGitlab = (data: any) => {
    this.gitlab.add('event-merge', data, this.queueOptions)
  }

  eventClickup = (event: string, data: any) => {
    this.clickup.add(event, data, this.queueOptions)
  }

  eventQase = (data: any) => {
    this.qase.add('event-qase', data, this.queueOptions)
  }
}
