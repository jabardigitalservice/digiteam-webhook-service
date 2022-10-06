import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClickupTask } from 'src/interface/clickup-task.interface'

@Injectable()
export class ClickupService {
  private url = this.configService.get('url.clickup')
  private teamID = this.configService.get('clickup.teamID')
  private apiKey = this.configService.get('clickup.apiKey')
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  GetTaskByID = async (id: string): Promise<ClickupTask> => {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.url}/task/${id}?custom_task_ids=true&team_id=${this.teamID}&include_subtasks=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.apiKey,
          },
        }
      )

      return response.data
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
