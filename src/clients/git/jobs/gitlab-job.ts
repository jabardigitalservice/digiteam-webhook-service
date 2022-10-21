import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { GitlabMerge } from 'src/interface/gitlab-merge.interface'
import { GitService } from '../git.service'
import { Git } from '../interface/git.interface'

@Injectable()
@Processor('gitlab')
export class GitlabJob {
  constructor(private gitService: GitService) {}

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
    await this.gitService.send(git, 'gitlab')
    await job.progress(100)
    return job.moveToCompleted()
  }
}
