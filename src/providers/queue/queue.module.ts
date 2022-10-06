import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { QueueService } from './queue.service'

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
        }
      },
    }),
    BullModule.registerQueue({
      name: 'github',
    }),
    BullModule.registerQueue({
      name: 'gitlab',
    }),
    BullModule.registerQueue({
      name: 'clickup',
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
