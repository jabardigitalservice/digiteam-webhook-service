import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { ElasticService } from './elastic.service'

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        cloud: {
          id: configService.get('elastic.cloudID'),
        },
        auth: {
          apiKey: configService.get('elastic.apiKey'),
        },
      }),
    }),
  ],
  providers: [ElasticService, ConfigService],
  exports: [ElasticService],
})
export class ElasticModule {}
