import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { QaseService } from './qase.service'

@Controller('qase')
export class QaseController {
  constructor(private config: ConfigService, private service: QaseService) {}

  @Post('/:secret')
  async qase(@Body() body: any, @Param('secret') secret: string, @Res() res: Response) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.qase(body)
    return res.send('Success')
  }
}
