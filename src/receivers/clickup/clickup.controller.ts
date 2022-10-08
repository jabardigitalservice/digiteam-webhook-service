import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { ClickupService } from './clickup.service'

@Controller('clickup')
export class ClickupController {
  constructor(private config: ConfigService, private service: ClickupService) {}

  @Post('/task-status-updated/:secret')
  async taskStatusUpdated(
    @Body() body: any,
    @Param('secret') secret: string,
    @Res() res: Response
  ) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.taskStatusUpdated(body)
    return res.send('Success')
  }
}
