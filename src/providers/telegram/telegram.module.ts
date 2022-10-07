import { HttpModule } from '@nestjs/axios'
import { CacheModule, Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import type { ClientOpts } from 'redis'

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
  ],
  providers: [TelegramService, UserService],
  exports: [TelegramService, UserService],
})
export class TelegramModule {}
