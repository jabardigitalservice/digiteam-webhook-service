import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import path from 'path'

@Injectable()
export class ScreenshotService {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  isUrlImage = (url: string) => {
    const fileTypes = new RegExp(this.configService.get('url.imageExt'))

    return fileTypes.test(path.extname(url).toLowerCase())
  }

  screenshot = async (url: string): Promise<string | null> => {
    if (this.isUrlImage(url)) return url

    const response = await this.httpService.axiosRef.post(
      this.configService.get('url.screenshot'),
      {
        url: url,
      }
    )
    if (response.status !== 200) return null

    return response.data
  }
}
