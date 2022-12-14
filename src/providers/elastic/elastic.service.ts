import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import moment from 'moment'
import { Evidence } from 'src/interface/evidence.interface'

@Injectable()
export class ElasticService {
  private readonly logger = new Logger()

  constructor(
    private elasticSearchService: ElasticsearchService,
    private configService: ConfigService
  ) {}

  getIndex = () => {
    return this.configService.get('app.name') + '-' + moment().format('YYYY-MM')
  }

  create = async (data: any) => {
    this.logger.log('elastic create evidence', {
      createdAt: moment().toISOString(),
      ...data,
    })
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
      this.logger.log('elastic create evidence', {
        project: evidence.project,
        participant,
        ...evidence,
      })
      this.create({
        project: evidence.project,
        participant,
        ...evidence,
      })
    }
  }
}
