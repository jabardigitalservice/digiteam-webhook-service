import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import moment from 'moment'
import logger from 'src/common/helpers/logger'
import { Evidence } from 'src/interface/evidence.interface'

@Injectable()
export class ElasticService {
  constructor(
    private elasticSearchService: ElasticsearchService,
    private configService: ConfigService
  ) {}

  getIndex = () => {
    return this.configService.get('app.name') + '-' + moment().format('YYYY-MM')
  }

  create = async (data: any) => {
    logger.log(
      JSON.stringify({
        createdAt: moment().toISOString(),
        ...data,
      })
    )
    return this.elasticSearchService.index({
      index: this.getIndex(),
      body: {
        createdAt: moment().toISOString(),
        ...data,
      },
    })
  }

  public createElasticEvidence = async (evidence: Evidence): Promise<void> => {
    const { participants } = evidence
    for (const participant of participants) {
      if (!participant) continue
      logger.log(
        JSON.stringify({
          project: evidence.project,
          participant,
          ...evidence,
        })
      )
      this.create({
        project: evidence.project,
        participant,
        ...evidence,
      })
    }
  }
}
