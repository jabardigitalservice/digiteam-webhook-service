import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GithubMerge } from 'src/interface/github-merge.interface'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'
import { PayloadService } from '../services/payload/payload.service'

@Injectable()
@Processor('github')
export class GithubJob {
  constructor(private gitService: GitService, private payloadService: PayloadService) {}

  @Process('event-merge-git')
  async eventMerge(job: Job) {
    const payload = job.data as GithubMerge
    const git: Git = {
      repoName: payload.pull_request.head.repo.name,
      repoUrl: payload.pull_request.head.repo.html_url,
      url: payload.pull_request.html_url,
      description: payload.pull_request.body,
      createdBy: payload.pull_request.user.login,
      createdAt: moment().toISOString(),
    }

    const evidence = await this.payloadService.getEvidence(git)
    this.gitService.sendTelegram(evidence)
    this.gitService.createElastic(evidence)
    await job.finished()
  }
}
