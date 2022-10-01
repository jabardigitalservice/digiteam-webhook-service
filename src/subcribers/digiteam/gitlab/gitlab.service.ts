import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GitlabMerge } from 'src/interface/gitlab-merge.interface'
import { DigiteamService } from '../digiteam.service'

@Injectable()
@Processor('gitlab')
export class GitlabService {
  constructor(private digiteamService: DigiteamService) {}

  @Process('event-merge-digiteam')
  async eventMerge(job: Job) {
    const payload = job.data as GitlabMerge
    const data = {
      repoName: payload.repository.name,
      repoUrl: payload.repository.homepage,
      url: payload.object_attributes.url,
      body: payload.object_attributes.description,
      createdBy: payload.user.name,
      createdAt: moment().toISOString(),
    }

    const body = await this.digiteamService.body(data)
    this.digiteamService.sendTelegram(body)
  }
}
