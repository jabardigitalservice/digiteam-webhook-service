import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GitlabMerge } from 'src/interface/gitlab-merge.interface'
import { DigiteamService } from '../digiteam.service'
import { Payload } from '../interface/digiteam.interface'
import { PayloadService } from '../services/payload/payload.service'

@Injectable()
@Processor('gitlab')
export class GitlabJob {
  constructor(private digiteamService: DigiteamService, private payloadService: PayloadService) {}

  @Process('event:merge:digiteam')
  async eventMerge(job: Job) {
    const payload = job.data as GitlabMerge
    const data: Payload = {
      repoName: payload.repository.name,
      repoUrl: payload.repository.homepage,
      url: payload.object_attributes.url,
      body: payload.object_attributes.description,
      createdBy: payload.user.name,
      createdAt: moment().toISOString(),
    }

    const body = await this.payloadService.body(data)
    this.digiteamService.sendTelegram(body)
    await job.finished()
  }
}
