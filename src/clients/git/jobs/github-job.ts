import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import moment from 'moment'
import { GithubMerge } from 'src/interface/github-merge.interface'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'

@Injectable()
@Processor('github')
export class GithubJob {
  constructor(private gitService: GitService) {}

  @Process('event-merge')
  async eventMerge(job: Job) {
    const payload = job.data as GithubMerge
    const git: Git = {
      repoName: payload.pull_request.head.repo.name,
      repoUrl: payload.pull_request.head.repo.html_url,
      url: payload.pull_request.html_url,
      description: payload.pull_request.body,
      createdBy: payload.pull_request.user.login,
    }

    this.gitService.createEvidence(git, 'github')
    return job.finished()
  }
}
