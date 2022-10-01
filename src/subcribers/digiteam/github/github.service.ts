import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GithubMerge } from 'src/interface/github-merge.interface'
import { DigiteamService } from '../digiteam.service'

@Injectable()
@Processor('github')
export class GithubService {
  constructor(private digiteamService: DigiteamService) {}

  @Process('event-merge-digiteam')
  async eventMerge(job: Job) {
    const payload = job.data as GithubMerge
    const data = {
      repoName: payload.pull_request.head.repo.name,
      repoUrl: payload.pull_request.head.repo.html_url,
      url: payload.pull_request.html_url,
      body: payload.pull_request.body,
      createdBy: payload.pull_request.user.login,
      createdAt: moment().toISOString(),
    }

    const body = await this.digiteamService.body(data)
    this.digiteamService.sendTelegram(body)
  }
}
