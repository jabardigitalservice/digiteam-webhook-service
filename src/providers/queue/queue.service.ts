import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { JobOptions, Queue } from 'bull'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('gitlab') private gitlab: Queue,
    @InjectQueue('github') private github: Queue,
    @InjectQueue('clickup') private clickup: Queue
  ) {}

  queueOptions: JobOptions = {
    delay: 10000,
    attempts: 1,
    removeOnFail: true,
    removeOnComplete: true,
    timeout: 30000,
  }

  eventMergeGithub = (data: any) => {
    this.github.add('event-merge', data, this.queueOptions)
  }

  eventMergeGitlab = (data: any) => {
    this.gitlab.add('event-merge', data, this.queueOptions)
  }

  eventTaskStatusUpdatedClickup = (data: any) => {
    this.clickup.add('event-task-status-updated', data, this.queueOptions)
  }

  eventCaseCreatedQase = (data: any) => {
    this.clickup.add('event-case-created', data, this.queueOptions)
  }
}
