import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class ZhihuService {
  public url: string = 'https://www.zhihu.com/billboard'

  public delay: number = 5 * 60 * 1000
  public headers = {
    scheme: 'https',
    accept: 'text/html, application/xhtml+xml, application/xml',
    'accept-language': 'zh-CN, zh',
    'user-agent': `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36`
  }

  private readonly logger = new Logger(ZhihuService.name)

  constructor(private readonly httpService: HttpService) {}

  public async start() {
    const response = await this.getHtml(this.url)
    const $ = cheerio.load(response.data, { xmlMode: false })
    let data = []
    $('script').each((_, el) => {
      const id = $(el).attr('id')
      if (id === 'js-initialData') {
        const json = JSON.parse($(el).text())
        const realData = json['initialState']['topstory']['hotList'].map(
          (item) => item.target
        ) as any[]
        data = realData.map((item) => {
          const title = item.titleArea.text
          const subtitle = item.excerptArea.text
          const thumbnail = item.imageArea.url
          const metric = item.metricsArea.text
          const url = item.link.url

          return { title, subtitle, thumbnail, metric, url }
        })
      }
    })

    return data
  }

  async getHtml(url: string) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<string>(url, {
          headers: this.headers
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
