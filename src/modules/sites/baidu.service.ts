import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { genUserAgent } from 'src/helpers'

interface Tag {
  path: string
  name: string
}

@Injectable()
export class BaiduService {
  private logger = new Logger(BaiduService.name)
  private tags: Tag[] = [
    { path: '/hot', name: '热搜' },
    { path: '/novel', name: '小说' },
    { path: '/movie', name: '电影' },
    { path: '/teleplay', name: '电视剧' },
    { path: '/car', name: '汽车' },
    { path: '/game', name: '游戏' }
  ]

  constructor(private httpService: HttpService) {}

  public async hot() {
    const url = `https://top.baidu.com/board?tab=realtime`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
    // const $ = cheerio.load(response.data)
    // const listEl = $('.category-wrap_iQLoo')
    // const data = listEl
    //   .map((index, item) => {
    //     const title = $(item).find('.content_1YWBm a div').text()
    //     const subtitle = $(item)
    //       .find('.content_1YWBm .hot-desc_1m_jR')
    //       .text()
    //       .trim()
    //       .replace(/\>/, '')
    //       .replace('查看更多', '')
    //     const metric = $(item)
    //       .find('.trend_2RttY .hot-index_1Bl1a')
    //       .text()
    //       .trim()
    //     const url = $(item).find('a').attr('href')
    //     //? 有两个img，第一个img为图标
    //     const thumbnail = $(item).find('a img').last().attr('src')
    //     return { url, title, subtitle, metric, thumbnail }
    //   })
    //   .toArray()

    // return data
  }

  public async novel() {
    const url = `https://top.baidu.com/board?tab=novel`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
  }

  public async movie() {
    const url = `https://top.baidu.com/board?tab=movie`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
  }

  public async teleplay() {
    const url = `https://top.baidu.com/board?tab=teleplay`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
  }

  public async car() {
    const url = `https://top.baidu.com/board?tab=car`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
  }

  public async game() {
    const url = `https://top.baidu.com/board?tab=game`
    const userAgent = genUserAgent('desktop')
    const response = await this.http<string>(url, { 'user-agent': userAgent })
    return await this.crawler(response.data)
  }

  //#region 爬虫逻辑
  public async crawler(data: string) {
    const $ = cheerio.load(data)
    return $('.category-wrap_iQLoo')
      .map((index, item) => {
        //? 热门标签 与 title 在同一个div内
        const title = $(item)
          .find('.content_1YWBm .title_dIF3B div')
          .first()
          .text()
          .trim()
        //? 热搜页和其他页不同 class
        let subtitle: string = ''
        const subTitle1 = $(item)
          .find('.content_1YWBm .desc_3CTjT')
          .text()
          .trim()
        const subTitle2 = $(item)
          .find('.content_1YWBm .hot-desc_1m_jR')
          .text()
          .trim()
        subtitle = (subTitle1 || subTitle2)
          .replace('查看更多', '')
          .replace(/\>/, '')
          .replaceAll('.', '')
          .trim()

        const metrics = [
          $(item).find('.trend_2RttY .hot-index_1Bl1a').text().trim()
        ]
        $(item)
          .find('.content_1YWBm .intro_1l0wp')
          .each((_, el) => {
            metrics.push($(el).text())
          })
        let isHot: boolean = false

        const hotEl = $(item)
          .find('.content_1YWBm .title_dIF3B .hot-tag_1G080')
          .text()
          .trim()
        if (hotEl) isHot = true

        const url = $(item).find('a').attr('href')
        //? 有两个img，第一个img为图标
        const thumbnail = $(item)
          .find('.img-wrapper_29V76 img')
          .last()
          .attr('src')
        return { url, title, subtitle, thumbnail, metrics, isHot }
      })
      .toArray()
  }
  //#endregion

  public async http<T>(url: string, headers: {} = {}, params = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers,
          params
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
