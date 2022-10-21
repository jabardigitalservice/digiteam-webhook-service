import { OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { source } from 'src/common/helpers/source'
import { GithubMerge } from 'src/interface/github-merge.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'

@Injectable()
@Processor(source.GITHUB)
export class GithubJob {
  constructor(private gitService: GitService, private elasticService: ElasticService) {}

  @Process('event-merge')
  async eventMerge(job: Job) {
    const payload = job.data as GithubMerge
    const git: Git = {
      repoName: payload.pull_request.head.repo.name,
      repoUrl: payload.pull_request.head.repo.html_url,
      url: payload.pull_request.html_url,
      description: payload.pull_request.body,
    }
    await job.progress(50)
    await this.gitService.send(git, source.GITHUB)
    await job.progress(100)
    return job.moveToCompleted()
  }

  @OnQueueFailed()
  onQueueFailed(job: Job) {
    this.elasticService.createElasticEvidenceFailed({
      isValid: false,
      source: source.GITHUB,
      ...job.data,
    })
  }
}
