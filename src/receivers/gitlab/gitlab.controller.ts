import { Body, Controller, Param, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { exampleGitlabEventMerge } from 'src/common/swagger/gitlab'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { GitlabService } from './gitlab.service'

@ApiTags('gitlab')
@Controller('gitlab')
export class GitlabController {
  constructor(private config: ConfigService, private service: GitlabService) {}

  @Post('/merge/:secret')
  @ApiBody({
    schema: {
      type: 'object',
      example: exampleGitlabEventMerge,
    },
  })
  async merge(@Body() body: any, @Param('secret') secret: string, @Res() res: Response) {
    verifySecretKey(secret, this.config.get('app.key'))
    this.service.eventMerge(body)
    return res.send('Success')
  }
}
