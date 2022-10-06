import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GithubMerge } from 'src/interface/github-merge.interface'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'
import { PayloadService } from '../services/payload/payload.service'

@Injectable()
@Processor('github')
export class GithubJob {
  constructor(
    private gitService: GitService,
    private payloadService: PayloadService,
    private telegramService: TelegramService
  ) {}

  @Process('event-merge')
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

    this.gitService.createEvidence(git)
    await job.finished()
  }
}
