import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { ClickupTaskStatusUpdated } from 'src/interface/clickup-task-status-updated.interface'
import { ClickupService } from './clickup.service'

@Controller('clickup')
@ApiTags('clickup')
export class ClickupController {
  constructor(private config: ConfigService, private service: ClickupService) {}

  @Post('/task-status-updated/:secret')
  @ApiBody({ description: 'body from webhook clickup event task status updated' })
  async taskStatusUpdated(
    @Body() body: ClickupTaskStatusUpdated,
    @Param('secret') secret: string,
    @Res() res: Response
  ) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.taskStatusUpdated(body)
    return res.send('Success')
  }

  @Post('/task-comment-posted/:secret')
  @ApiBody({ description: 'body from webhook clickup event task comment posted' })
  async taskCommentPosted(
    @Body() body: any,
    @Param('secret') secret: string,
    @Res() res: Response
  ) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.taskCommentPosted(body)
    return res.send('Success')
  }
}
