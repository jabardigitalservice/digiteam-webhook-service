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

  screenshot = async (url: string): Promise<string> => {
    if (this.isUrlImage(url)) return url

    try {
      const response = await this.httpService.axiosRef.post(
        this.configService.get('url.screenshot'),
        {
          url: url,
        }
      )
      return response.data
    } catch (error) {
      return null
    }
  }
}
