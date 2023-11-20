import { InjectBrowser, InjectContext, InjectPage } from 'nestjs-playwright'
import { Inject, Injectable, Logger } from '@nestjs/common'
import type { Browser, BrowserContext, Page } from 'playwright'
import { HttpService } from '@nestjs/axios'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'
import * as cheerio from 'cheerio'
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager'
import { delay } from 'src/helpers'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'

@Injectable()
export class ITHomeService {
  // public url: string = 'https://www.ithome.com';
  public url: string = 'https://m.ithome.com/rankm/'
  public delay: number = 5 * 60 * 1000
  public userAgent: string = `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36`
  private readonly logger = new Logger(ITHomeService.name)

  private readonly tags: ['日榜', '周榜', '热评', '月榜']

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    @InjectPage() private readonly internalPage: Page,
    @InjectContext() private readonly internalContext: BrowserContext,
    @InjectRedis() private readonly redis: Redis,
    private readonly httpService: HttpService
  ) {}

  async day() {
    return JSON.parse(await this.redis.get('ithome/day'))
  }
  async week() {
    return JSON.parse(await this.redis.get('ithome/week'))
  }
  async month() {
    return JSON.parse(await this.redis.get('ithome/month'))
  }
  async hot() {
    return JSON.parse(await this.redis.get('ithome/hot'))
  }

  async start() {
    const response = await this.getHtml(this.url)
    const $ = cheerio.load(response.data)

    const data = {
      day: {},
      week: {},
      month: {},
      hot: {},
      latest: {}
    }

    await Promise.all(
      $('.rank-box')
        .map(async (index, rank) => {
          const items = await this.crawler($, rank)
          switch (index) {
            case 0:
              data.day = items
              await this.redis.set(
                'ithome/day',
                JSON.stringify(items),
                'EX',
                3600
              )
              break
            case 1:
              data.week = items
              await this.redis.set(
                'ithome/week',
                JSON.stringify(items),
                'EX',
                3600
              )
              break
            case 2:
              data.hot = items
              await this.redis.set(
                'ithome/hot',
                JSON.stringify(items),
                'EX',
                3600
              )
              break
            case 3:
              data.month = items
              await this.redis.set(
                'ithome/month',
                JSON.stringify(items),
                'EX',
                3600
              )
              break
            default:
              break
          }
          return items
        })
        .toArray()
    )

    await this.redis.set('ithome', JSON.stringify(data), 'EX', 3600)

    return data
  }

  async crawler($: cheerio.CheerioAPI, el: cheerio.Element) {
    const items = await Promise.all(
      $(el)
        .find('div a')
        .map(async (index, a) => {
          const url = $(a).attr('href')
          const originUrl = this.transformPCUrl(url)
          const title = $(a).find('.plc-title').text()
          const thumbnail = $(a).find('.plc-image img').attr('src')
          const time = $(a).find('.post-time').text()
          const comments = $(a).find('.review-num').text()
          this.logger.log(`Delay::3000`)
          const response = await this.getHtml(url)
          const $$ = cheerio.load(response.data)
          const subtitle = $$('p').text()
          return { url, originUrl, title, thumbnail, time, comments, subtitle }
        })
        .toArray()
    )
    return items
  }

  // #region playwright
  async playwright(): Promise<any> {
    const ctx = await this.browser.newContext({
      userAgent: this.userAgent
    })
    const page = await ctx.newPage()
    await page.goto(this.url, {
      waitUntil: 'networkidle',
      timeout: this.delay
    })

    const els = await page.$$('.rank-box')
    const dayEl = els[0]
    const weekEl = els[1]
    const latestEl = els[2]
    const monthEl = els[3]

    const dayList = await Promise.all(
      (await dayEl.$$('div a')).map(async (item) => {
        const url = await item.getAttribute('href')
        const originUrl = this.transformPCUrl(url)
        const title = await (await item.$('.plc-con .plc-title')).textContent()
        const thumbnail = await (await item.$('img')).getAttribute('src')
        const time = await (
          await item.$('.plc-footer .post-time')
        ).textContent()
        const comments = await (
          await item.$('.plc-footer .review-num')
        ).textContent()
        const detailPage = await ctx.newPage()
        await detailPage.goto(url, { waitUntil: 'networkidle' })
        const subtitle = await //* get the first el
        (await detailPage.$('[data-vmark]')).textContent()

        const stuff = {
          time,
          comments
        }
        return {
          url,
          originUrl,
          subtitle,
          title,
          thumbnail,
          stuff
        }
      })
    )

    await page.close()
    return {
      day: dayList
    }
  }
  // #endregion

  async getHtml(url: string) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<string>(url, {
          headers: {
            'User-Agent': this.userAgent
          }
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

  public transformPCUrl(url: string) {
    const regex = /\d+/g
    const id = url.match(regex)[0]

    const pathOne = id.slice(0, 3)
    const pathTwo = id.slice(3, id.length)

    return `https://www.ithome.com/0/${pathOne}/${pathTwo}.htm`
  }
}
