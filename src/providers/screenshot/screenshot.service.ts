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
    url = url.trim()
    if (!url || this.isUrlImage(url)) return

    // attempts 3 for Get Screenshot
    let urlImage: string
    for (let index = 0; index < 3; index++) {
      urlImage = await this.getScreenshot(url)
      if (urlImage) break
      // delay 1 second for next retry
      const iterasi = index + 1
      await new Promise((resolve) => setTimeout(resolve, iterasi * 2000))
    }

    return urlImage
  }

  getScreenshot = async (url: string) => {
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
