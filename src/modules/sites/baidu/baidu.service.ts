import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genUserAgent, removeHtmlTag } from 'src/helpers'
import { Repository } from 'typeorm'
import { RedisService } from 'src/shared/redis.service'
import { FetchService } from 'src/shared/fetch.service'
import * as cheerio from 'cheerio'
import { BaiduRankTab } from './baidu.constant'

@Injectable()
export class BaiduService {
  private readonly logger = new Logger(BaiduService.name)
  private readonly headers: {} = {
    'User-Agent': genUserAgent('desktop')
  }
  private readonly proxy: {} = {}

  private readonly baseUrl = `https://top.baidu.com/board?tab=`

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async rank(tab: BaiduRankTab = BaiduRankTab.REALTIME) {
    const url = `https://top.baidu.com/board?tab=${tab}`
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const items = this.parseDom(response.data)
    return items
  }

  public parseDom(html: string) {
    const $ = cheerio.load(html)
    const items = $('.category-wrap_iQLoo')
      .map((index, el) => {
        const linkEl = $(el).find('.img-wrapper_29V76')
        //? 置顶时有两个 img
        //? 封面图则始终获取最后一个元素
        const thumbnailEl = $(linkEl).find('img').last()
        const isTop = $(linkEl).find('img').length === 2 ? true : false
        const contentEl = $(el).find('.content_1YWBm')
        //? 第一个 div 为标题
        //? 第二个 div 为热度图标
        const headlineEl = $(contentEl).find('.title_dIF3B').find('div')
        const titlEl = $(headlineEl).first()
        //? 热度图标带有文字，判断是否为空字符串
        const isHot = $(headlineEl).last().text().includes('热')
        //? caption 移除子元素 a
        const realTimeCaptionEl = $(contentEl)
          .find('.hot-desc_1m_jR')
          .contents()
          .first()
        const otherCaptionEl = $(contentEl)
          .find('.desc_3CTjT')
          .contents()
          .first()
        //? 数据
        const trendEl = $(el).find('.trend_2RttY')
        //* same, top, down
        let trendStatus: string

        const trendIconUrl = $(trendEl)
          .find('.trend-icon_1Z3Cd')
          .find('img')
          .attr('src')
        switch (true) {
          case trendIconUrl.includes('same'):
            trendStatus = 'same'
            break
          case trendIconUrl.includes('top'):
            trendStatus = 'top'
            break
          case trendIconUrl.includes('down'):
            trendStatus = 'down'
            break
        }

        //? 热度
        const hotValuEl = $(trendEl).find('.hot-index_1Bl1a')
        const metrics = $(contentEl)
          .find('.intro_1l0wp')
          .map((_, el) => $(el).text().trim())
          .toArray()

        return {
          title: titlEl.text().trim() || '',
          originUrl: $(linkEl).attr('href') || '',
          caption:
            realTimeCaptionEl.text().trim() ||
            otherCaptionEl.text().trim() ||
            '',
          thumbnail: thumbnailEl.attr('src') || '',
          status: { top: isTop, hot: isHot, trend: trendStatus },
          stats: { hot: +hotValuEl.text() || '' },
          metrics
        }
      })
      .toArray()

    return items
  }
}
