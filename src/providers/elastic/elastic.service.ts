import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import moment from 'moment'
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
    return this.elasticSearchService.index({
      index: this.getIndex(),
      body: data,
    })
  }

  public createElasticEvidence = async (evidence: Evidence): Promise<void> => {
    const { participants } = evidence
    for (const participant of participants) {
      if (!participant) continue
      this.create({
        project: evidence.project.trimEnd(),
        participant,
        ...evidence,
      })
    }
  }
}
