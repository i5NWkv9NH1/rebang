import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { HUPU_API, HUPU_TABS } from './hupu.constant'
import { InjectBrowser } from 'nestjs-playwright'
import {
  Browser,
  BrowserContext,
  BrowserContextOptions,
  Page
} from 'playwright'
import { HupuItem } from './hupu.type'

@Injectable()
export class HupuService {
  private readonly logger = new Logger(HupuService.name)

  private readonly ctxOptions: BrowserContextOptions = {
    userAgent: genUserAgent('desktop')
  }

  constructor(
    @InjectBrowser()
    private readonly browser: Browser,
    private readonly fetchService: FetchService
  ) {}

  //#region 板块
  public async plate(tab: HUPU_TABS = HUPU_TABS.SPORTS) {
    const url = HUPU_API[tab]
    const ctx = await this.browser.newContext(this.ctxOptions)
    const page = await ctx.newPage()
    const items: HupuItem[] = await this.crawler(url, page)

    return items
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
        const originUrl =
          'https://bbs.hupu.com' + (await linkEl.getAttribute('href'))
        const titlEl = await item.$('.list-item-info a div')
        const title = await titlEl.innerText()
        const subtitleEl = await item.$('.list-item-info .list-item-desc')

        //? 帖子无文字内容&&只发布图片
        //? 副标题会显示 [图片]
        const caption = (await subtitleEl.innerText()).replace(/\[图片\]/, '')
        const metricsEl = await item.$('.list-item-info .list-item-lights div')
        const metrics = metricsEl
          ? (await metricsEl.innerText()).split(' ')
          : []
        const areaEl = await item.$(
          '.list-item-info .list-item-lights .t-label'
        )
        const tag = await areaEl.innerText()
        const imageEl = await item.$('.list-img img')
        let thumbnailUrl: string
        if (imageEl) {
          thumbnailUrl = await imageEl.getAttribute('src')
        } else {
          thumbnailUrl = ''
        }
        const stauts = {
          hot: isHot
        }
        return {
          originUrl,
          title,
          caption,
          metrics,
          thumbnailUrl,
          tag,
          stauts
        }
      })
    )

    return data
  }
  //#endregion
}
