import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { ClickupService } from './clickup.service'

@Controller('clickup')
export class ClickupController {
  constructor(private config: ConfigService, private service: ClickupService) {}

  @Post('/task-moved/:secret')
  async merge(@Body() body: any, @Param('secret') secret: string, @Res() res: Response) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.taskMoved(body)
    return res.send('Success')
  }
}
