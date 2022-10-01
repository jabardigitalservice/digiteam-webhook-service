import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verifySecretKey } from '../../common/helpers/verifySecret'
import { GithubService } from './github.service'

@Controller('github')
export class GithubController {
  constructor(private config: ConfigService, private service: GithubService) {}

  @Post('/merge/:secret')
  async merge(@Body() body: any, @Param('secret') secret: string, @Res() res: Response) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.eventMerge(body)
    return res.send('Success')
  }
}
