import { Module } from '@nestjs/common'
import { GithubModule } from './receivers/github/github.module'
import { GitModule } from './clients/git/git.module'
import { AppConfigModule } from './config/config.module'
import { GitlabModule } from './receivers/gitlab/gitlab.module'
import { EvidenceModule } from './providers/evidence/evidence.module'
import { ClickupModule as ReceiverClickupModule } from './receivers/clickup/clickup.module'
import { ClickupModule } from './clients/clickup/clickup.module'

@Module({
  imports: [
    AppConfigModule,
    GithubModule,
    GitlabModule,
    GitModule,
    EvidenceModule,
    ReceiverClickupModule,
    ClickupModule,
  ],
  providers: [],
})
export class AppModule {}
