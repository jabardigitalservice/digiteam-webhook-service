import { HttpModule } from '@nestjs/axios'
import { CacheModule, Module } from '@nestjs/common'
import { ClickupService } from './clickup.service'
import { ClickupJob } from './jobs/clickup-job'
import type { ClientOpts } from 'redis'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { TelegramModule } from 'src/providers/telegram/telegram.module'
import { ScreenshotModule } from 'src/providers/screenshot/screenshot.module'
import { ElasticModule } from 'src/providers/elastic/elastic.module'
import { EvidenceModule } from 'src/providers/evidence/evidence.module'
import { PayloadService } from './services/payload/payload.service'
import { UserService } from './services/user/user.service'

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
  providers: [ClickupService, ClickupJob, PayloadService, UserService],
})
export class ClickupModule {}
