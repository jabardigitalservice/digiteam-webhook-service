import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClickupTask } from 'src/interface/clickup-task.interface'
import { Evidence } from 'src/interface/evidence.interface'
import { ElasticService } from 'src/providers/elastic/elastic.service'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { ScreenshotService } from 'src/providers/screenshot/screenshot.service'
import { TelegramService } from 'src/providers/telegram/telegram.service'
import { Clickup } from './interface/clickup.interface'

@Injectable()
export class ClickupService {
  private url = this.configService.get('url.clickup')
  private teamID = this.configService.get('clickup.teamID')
  private apiKey = this.configService.get('clickup.apiKey')
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private evidenceService: EvidenceService,
    private telegramService: TelegramService,
    private screenshotService: ScreenshotService,
    private elasticService: ElasticService
  ) {}

  public send = async (clickup: Clickup, assignees: string[] = []) => {
    const evidence = await this.getEvidence(clickup, assignees)
    this.sendEvidence(evidence)
    this.elasticService.createElasticEvidence(evidence)
  }

  public getTaskByID = async (id: string): Promise<ClickupTask> => {
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

  public getEvidence = async (clickup: Clickup, assignees: string[]): Promise<Evidence> => {
    const evidence = await this.evidenceService.getEvidence(clickup.description, assignees)
    delete clickup.description
    evidence.source = {
      ...clickup,
      source: 'clickup',
    }
    evidence.url = clickup.url
    return evidence
  }

  public sendEvidence = async (evidence: Evidence): Promise<void> => {
    const message = this.telegramService.formatDefault(evidence)
    const url = evidence.screenshot ? evidence.screenshot : evidence.url

    const picture = await this.screenshotService.screenshot(url)
    const messageId = await this.telegramService.sendPhotoWithBot(picture)

    if (picture && messageId) {
      this.telegramService.sendMessageWithUser(message, messageId)
      return
    }

    this.telegramService.sendMessageWithBot(message)
  }
}
