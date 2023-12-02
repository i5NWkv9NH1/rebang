import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { HISTORY_API } from './history.constant'
import * as cheerio from 'cheerio'
import { HistoryItem } from './history.type'

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(private readonly fetchService: FetchService) {}

  public async _360() {
    const url = HISTORY_API._360
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const items: HistoryItem[] = $('.tih-list')
      .find('dl')
      .map((index, el) => {
        const metrics = $(el).find('dt').text().split(' ')
        const title = metrics[metrics.length - 1]
        const thumbnail = $(el).find('img').attr('data-src')
        const subtitle = $(el).find('dd').find('.desc').text().trim()

        return {
          title,
          originUrl: '',
          thumbnailUrl: thumbnail ?? '',
          subtitle
        }
      })
      .toArray()

    return items
  }
}
