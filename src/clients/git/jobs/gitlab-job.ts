import { OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { source } from 'src/common/helpers/source'
import { GitlabMerge } from 'src/interface/gitlab-merge.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'

@Injectable()
@Processor(source.GITLAB)
export class GitlabJob {
  constructor(private gitService: GitService, private elasticService: ElasticService) {}

  @Process('event-merge')
  async eventMerge(job: Job) {
    const payload = job.data as GitlabMerge
    const git: Git = {
      repoName: payload.repository.name,
      repoUrl: payload.repository.homepage,
      url: payload.object_attributes.url,
      description: payload.object_attributes.description,
    }

    await job.progress(50)
    await this.gitService.send(git, source.GITLAB)
    await job.progress(100)
    return job.moveToCompleted()
  }

  @OnQueueFailed()
  onQueueFailed(job: Job) {
    this.elasticService.createElasticEvidenceFailed({
      isValid: false,
      source: source.GITLAB,
      ...job.data,
    })
  }
}
