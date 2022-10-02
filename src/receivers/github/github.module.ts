import { Module } from '@nestjs/common'
import { GithubService } from './github.service'
import { GithubController } from './github.controller'
import { QueueModule } from '../../providers/queue/queue.module'

@Module({
  imports: [QueueModule],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
