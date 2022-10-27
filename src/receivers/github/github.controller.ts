import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { exampleGithubEventMerge } from 'src/common/swagger/github'
import { verifySecretKey } from '../../common/helpers/verifySecret'
import { GithubService } from './github.service'

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private config: ConfigService, private service: GithubService) {}

  @Post('/merge/:secret')
  @ApiBody({
    schema: {
      type: 'object',
      example: exampleGithubEventMerge,
    },
  })
  async merge(@Body() body: any, @Param('secret') secret: string, @Res() res: Response) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.eventMerge(body)
    return res.send('Success')
  }
}
