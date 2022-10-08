import { Module } from '@nestjs/common'
import { QueueModule } from 'src/providers/queue/queue.module'
import { QaseController } from './qase.controller'
import { QaseService } from './qase.service'

@Module({
  imports: [QueueModule],
  controllers: [QaseController],
  providers: [QaseService],
})
export class QaseModule {}
