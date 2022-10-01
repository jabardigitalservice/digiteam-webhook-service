import { Module } from '@nestjs/common'
import { GithubModule } from './receivers/github/github.module'
import { DigiteamModule } from './subcribers/digiteam/digiteam.module'
import { AppConfigModule } from './config/config.module'
import { GitlabModule } from './receivers/gitlab/gitlab.module'

@Module({
  imports: [AppConfigModule, GithubModule, GitlabModule, DigiteamModule],
  providers: [],
})
export class AppModule {}
