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
    attempts: 0,
    removeOnFail: true,
    removeOnComplete: {
      age: 24 * 3600
    },
    timeout: 30000,
    lifo: true,
  }

  randomDelayQueueOptions = () => {
    const jobOptions = this.queueOptions
    jobOptions.delay = this.queueOptions.delay * Math.floor(Math.random() * 30)
    return jobOptions
  }

  eventMergeGithub = (data: any) => {
    this.github.add('event-merge', data, this.randomDelayQueueOptions())
  }

  eventMergeGitlab = (data: any) => {
    this.gitlab.add('event-merge', data, this.randomDelayQueueOptions())
  }

  eventClickup = (event: string, data: any) => {
    this.clickup.add(event, data, this.randomDelayQueueOptions())
  }

  eventQase = (data: any) => {
    this.qase.add('event-qase', data, this.randomDelayQueueOptions())
  }
}
