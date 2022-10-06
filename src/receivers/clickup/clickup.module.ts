import { Module } from '@nestjs/common'
import { QueueModule } from 'src/providers/queue/queue.module'
import { ClickupController } from './clickup.controller'
import { ClickupService } from './clickup.service'

@Module({
  imports: [QueueModule],
  controllers: [ClickupController],
  providers: [ClickupService],
})
export class ClickupModule {}
