import { Module } from '@nestjs/common'
import { GithubModule } from './receivers/github/github.module'
import { GitModule } from './clients/git/git.module'
import { AppConfigModule } from './config/config.module'
import { GitlabModule } from './receivers/gitlab/gitlab.module'
import { EvidenceModule } from './providers/evidence/evidence.module'
import { ClickupModule as ReceiverClickupModule } from './receivers/clickup/clickup.module'
import { ClickupModule } from './clients/clickup/clickup.module'
import { QaseModule as ReceiverQaseModule } from './receivers/qase/qase.module'
import { QaseModule } from './clients/qase/qase.module'
import { HttpModule } from './receivers/http/http.module'

@Module({
  imports: [
    AppConfigModule,
    GithubModule,
    GitlabModule,
    GitModule,
    EvidenceModule,
    ReceiverClickupModule,
    ClickupModule,
    ReceiverQaseModule,
    QaseModule,
    HttpModule,
  ],
  providers: [],
})
export class AppModule {}
