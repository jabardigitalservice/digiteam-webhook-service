import { Module } from '@nestjs/common'
import { GitlabService } from './gitlab.service'
import { GitlabController } from './gitlab.controller'
import { QueueModule } from '../../providers/queue/queue.module'

@Module({
  imports: [QueueModule],
  providers: [GitlabService],
  controllers: [GitlabController],
  exports: [GitlabService],
})
export class GitlabModule {}
