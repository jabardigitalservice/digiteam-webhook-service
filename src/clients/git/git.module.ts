import { Module } from '@nestjs/common'
import { GitService } from './git.service'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { ElasticModule } from 'src/providers/elastic/elastic.module'
import { GitlabJob } from './jobs/gitlab-job'
import { GithubJob } from './jobs/github-job'
import { EvidenceModule } from 'src/providers/evidence/evidence.module'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'
import { HttpModule } from 'src/receivers/http/http.module'

@Module({
  imports: [TelegramModule, ElasticModule, EvidenceModule, ScreenshotModule, HttpModule],
  providers: [GitService, GitlabJob, GithubJob],
})
export class GitModule {}
