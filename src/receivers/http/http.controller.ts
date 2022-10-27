import { Body, Controller, Param, Post, Res, UsePipes } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { exampleEvidence } from 'src/common/swagger/http'
import { verifySecretKey } from 'src/common/helpers/verifySecret'
import { JoiValidationPipe } from 'src/common/pipe/joi-validator.pipe'
import { Evidence } from 'src/interface/evidence.interface'
import { HttpService } from './http.service'
import { EvidenceSchema } from './rules.schema'

@Controller('http')
@ApiTags('http')
export class HttpController {
  constructor(private config: ConfigService, private service: HttpService) {}

  @Post('evidence/:secret')
  @ApiBody({
    schema: {
      type: 'object',
      example: exampleEvidence,
    },
  })
  async merge(
    @Body(new JoiValidationPipe(EvidenceSchema)) body: Record<string, any>,
    @Param('secret') secret: string,
    @Res() res: Response
  ) {
    verifySecretKey(secret, this.config.get('app.key'))
    body.participants = body.participants.trimEnd().split(/[ ,]+/)
    const evidence = body as Evidence
    this.service.evidence(evidence)
    return res.send('Success')
  }
}
