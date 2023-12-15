import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import { SHADIAONEWS_API, SHADIAONEWS_CACHE_KEY } from './shadiaonews.constant'
import * as cheerio from 'cheerio'

@Injectable()
export class ShadiaonewsService {
  private readonly logger = new Logger(ShadiaonewsService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async start(currentPage: number = 0) {
    const cache = await this.redisService.get(`shadiaonews/${currentPage}`)
    if (cache) return cache

    const response = await this.fetchService.get<string>(
      `${SHADIAONEWS_API.MAIN}/${currentPage}`,
      { headers: this.headers }
    )
    const $ = cheerio.load(response.data)

    const items = $('#grid-wrapper')
      .find('article')
      .toArray()
      .slice(1)
      .map((el, index) => {
        const originUrl = $(el).find('.post-thumbnail').find('a').attr('href')
        const thumbnailUrl = $(el)
          .find('.post-thumbnail')
          .find('img')
          .attr('data-src')
        const title = $(el)
          .find('.post-content')
          .find('.post-title')
          .text()
          .trim()
        const caption = $(el)
          .find('.post-content')
          .find('.entry-summary')
          .text()
          .trim()
        const publishedDate = $(el)
          .find('.post-content')
          .find('.post-date')
          .text()
          .trim()
        const category = $(el)
          .find('.post-content')
          .find('.post-category')
          .text()
          .trim()
        return {
          originUrl,
          title,
          caption,
          thumbnailUrl,
          publishedDate,
          stats: { category }
        }
      })

    await this.redisService.set(
      `${SHADIAONEWS_CACHE_KEY.MAIN}/${currentPage}`,
      items
    )
    return items
  }
}
