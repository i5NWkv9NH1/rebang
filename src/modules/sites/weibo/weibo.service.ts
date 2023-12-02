import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import * as cheerio from 'cheerio'
import { FetchService } from 'src/shared/fetch.service'
import { WEIBO_API } from './weibo.constant'

//TODO: fix cralwer url
@Injectable()
export class WeiboService {
  private readonly logger = new Logger(WeiboService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop'),
    Referer: 'https://passport.weibo.com/',
    Cookie:
      'SUB=_2AkMSN--Rf8NxqwFRmfoXyGviboRwzQHEieKkax5KJRMxHRl-yT9kqmkjtRB6ObfBfhOHxzD2uM8GbCdZSSyGgpTKw4JV; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WW-ziXJ8S5d8gWuc8HUcyhn'
  }
  constructor(private readonly fetchService: FetchService) {}

  //#region  热搜
  public async realtimehot() {
    const url = WEIBO_API.REAL_TIME_HOT
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const els = $('.list_a').find('li a')
    const items = $(els)
      .map((_, item) => {
        const url = 'https://s.weibo.com' + $(item).attr('href')
        if (!url.includes('?q')) return
        const sort = $(item).find('.hot').text()

        const title = $(item)
          .find('span')
          .first()
          .contents()
          .filter(function () {
            return this.type === 'text'
          })
          .text()
          .trim()

        const metric = $(item).find('span em').text()
        const tag = $(item).find('i').attr('class')
        return {
          sort,
          url,
          title,
          tag,
          metric
        }
      })
      .toArray()

    return items
  }
  //#endregion

  //#region  要闻 新时代
  public async socialevent() {
    const url = WEIBO_API.SOCIAL_EVENT
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)
    const els = $('.list_b').find('li a')
    const items = $(els)
      .map((_, item) => {
        const thumbnail = $(item).find('div img').attr('src')
        const url = 'https://s.weibo.com' + $(item).attr('href')
        const body = $(item).find('article')
        const title = $(body).find('h2').text().replace('#', '')
        const subtitle = $(body).find('p').text()
        const metrics = $(body).find('span').text().split(' ')
        const tag = $(item).find('i').attr('class')
        return {
          url,
          thumbnail,
          title,
          subtitle,
          tag,
          metrics
        }
      })
      .toArray()

    return items
  }
  //#endregion

  //#region 文娱
  public async entrank() {
    const url = WEIBO_API.ENTRANK
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)
    const els = $('table tr')
    const items = $(els)
      .map((_, tr) => {
        const sort = $(tr).find('.td-01').text()
        const title = $(tr).find('.td-02 a').text()
        const metrics = [
          $(tr).find('.td-02 span').text(),
          $(tr).find('.td-03 i').text()
        ].filter((item) => item)
        const emoji = $(tr).find('.td-02 img').attr('alt')
        return {
          sort,
          title,
          metrics,
          emoji
        }
      })
      .toArray()
      .filter((item) => item.title)

    return items
  }
  //#endregion

  //#region  话题
  public async topicband() {
    const url = WEIBO_API.TOPIC_BAND
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)
    const els = $('.list_b').find('li a')
    const items = $(els)
      .map((_, item) => {
        const thumbnail = $(item).find('div img').attr('src')
        const url = $(item).attr('href')
        const body = $(item).find('article')
        const title = $(body).find('h2').text().replace('#', '')
        const subtitle = $(body).find('p').text()
        const metrics = $(body).find('span').text().split(' ')
        const tag = $(item).find('i').attr('class')
        return {
          url,
          thumbnail,
          title,
          subtitle,
          tag,
          metrics
        }
      })
      .toArray()

    return items
  }
  //#endregion
}
