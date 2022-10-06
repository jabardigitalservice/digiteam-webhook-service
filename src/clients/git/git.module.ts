import { CacheModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GitService } from './git.service'
import * as redisStore from 'cache-manager-redis-store'
import type { ClientOpts } from 'redis'
import { HttpModule } from '@nestjs/axios'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { ElasticModule } from 'src/providers/elastic/elastic.module'
import { UserService } from './services/user/user.service'
import { GitlabJob } from './jobs/gitlab-job'
import { GithubJob } from './jobs/github-job'
import { PayloadService } from './services/payload/payload.service'
import { EvidenceModule } from 'src/providers/evidence/evidence.module'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CacheModule.registerAsync<ClientOpts>({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
      }),
    }),
    TelegramModule,
    ScreenshotModule,
    ElasticModule,
    EvidenceModule,
  ],
  providers: [GitService, UserService, GitlabJob, GithubJob, PayloadService],
})
export class GitModule {}
