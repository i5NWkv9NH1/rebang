import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser, Page } from 'playwright'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { Tag } from 'src/types'

@Injectable()
export class HupuService {
  private logger = new Logger(HupuService.name)
  private tags: Tag[] = [
    { path: '/sports', name: '综合体育' },
    { path: '/gambia', name: '步行街' },
    { path: '/ent', name: '影视娱乐' },
    { path: '/lol', name: '英雄联盟' },
    { path: '/gg', name: '游戏' },
    { path: '/nba', name: 'NBA' },
    { path: '/gear', name: '装备' },
    { path: '/soccer', name: '国际足球' },
    { path: '/digital', name: '数码' }
  ]

  constructor(
    private readonly redisService: RedisService,
    @InjectBrowser() private readonly browser: Browser
  ) {}

  //#region 综合体育板块
  public async sports() {
    const cache = await this.redisService.get('hupu/sports')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-sports'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/sports', data)
    return data
  }
  //#endregion

  //#region 步行街板块
  public async gambia() {
    const cache = await this.redisService.get('hupu/gambia')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-gambia'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/gambia', data)
    return data
  }
  //#endregion

  //#region 影视娱乐板块
  public async ent() {
    const cache = await this.redisService.get('hupu/ent')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-ent'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/ent', data)
    return data
  }
  //#endregion

  //#region 英雄联盟板块
  public async lol() {
    const cache = await this.redisService.get('hupu/lol')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-lol'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/lol', data)
    return data
  }
  //#endregion

  //#region 游戏板块
  public async game() {
    const cache = await this.redisService.get('hupu/game')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-gg'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/game', data)
    return data
  }
  //#endregion

  //#region NBA板块
  public async nba() {
    const cache = await this.redisService.get('hupu/nba')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-nba'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/nba', data)
    return data
  }
  //#endregion

  //#region 装备板块
  public async gear() {
    const cache = await this.redisService.get('hupu/gear')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-gear'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/gear', data)
    return data
  }
  //#endregion

  //#region 数码板块
  public async digital() {
    const cache = await this.redisService.get('hupu/digital')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-digital'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/digital', data)
    return data
  }
  //#endregion

  //#region 国际足球板块
  public async soccer() {
    const cache = await this.redisService.get('hupu/soccer')
    if (cache) return cache

    const url = 'https://bbs.hupu.com/all-soccer'
    const userAgent = genUserAgent('desktop')
    const ctx = await this.browser.newContext({
      // userAgent: this.userAgent
      userAgent
    })
    const page = await ctx.newPage()
    const data = await this.crawler(url, page)

    await this.redisService.set('hupu/soccer', data)
    return data
  }
  //#endregion

  //#region 抓取逻辑
  public async crawler(url: string, page: Page) {
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.locator('.textImg-list-icon').click()

    await page.waitForSelector('.test-img-list-model')

    const dataEl = await page.$('.test-img-list-model')
    const list = await dataEl.$$('.list-wrap .list-item')
    const data = await Promise.all(
      list.map(async (item, index) => {
        const linkEl = await item.$('a')
        const hotSvgIcon = await linkEl.$('div svg')
        let isHot: boolean
        if (hotSvgIcon) isHot = true
        else isHot = false
        const url = await linkEl.getAttribute('href')
        const titlEl = await item.$('.list-item-info a div')
        const title = await titlEl.innerText()
        const subtitleEl = await item.$('.list-item-info .list-item-desc')

        //? 帖子无文字内容&&只发布图片
        //? 副标题会显示 [图片]
        const subtitle = (await subtitleEl.innerText()).replace(/\[图片\]/, '')
        const metricsEl = await item.$('.list-item-info .list-item-lights div')
        const metrics = metricsEl
          ? (await metricsEl.innerText()).split(' ')
          : []
        const areaEl = await item.$(
          '.list-item-info .list-item-lights .t-label'
        )
        const area = await areaEl.innerText()
        const imageEl = await item.$('.list-img img')
        let thumbnail: string
        if (imageEl) {
          thumbnail = await imageEl.getAttribute('src')
        } else {
          thumbnail = ''
        }
        return { url, title, subtitle, metrics, thumbnail, area, isHot }
      })
    )

    return data
  }
  //#endregion
}
