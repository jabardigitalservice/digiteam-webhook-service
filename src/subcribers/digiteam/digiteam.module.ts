import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DigiteamService } from './digiteam.service'
import { GithubService } from './github/github.service'
import * as redisStore from 'cache-manager-redis-store'
import type { ClientOpts } from 'redis'
import { AppConfigModule } from 'src/config/config.module'
import { HttpModule } from '@nestjs/axios'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { GitlabService } from './gitlab/gitlab.service'
import { ElasticModule } from 'src/providers/elastic/elastic.module'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CacheModule.registerAsync<ClientOpts>({
      imports: [ConfigModule, AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
      }),
    }),
    TelegramModule,
    ScreenshotModule,
    ElasticModule
  ],
  providers: [DigiteamService, GithubService, GitlabService],
  exports: [DigiteamService, HttpModule, CacheModule, TelegramModule, ScreenshotModule],
})
export class DigiteamModule {}
