import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class WeiboService {
  public url: string = 'https://s.weibo.com/top/summary?cate'
  public delay: number = 5 * 60 * 1000
  public headers = {
    scheme: 'https',
    cookie:
      'SUB=_2AkMWJrkXf8NxqwJRmP8SxWjnaY12zwnEieKgekjMJRMxHRl-yj9jqmtbtRB6PaaX-IGp-AjmO6k5cS-OH2X9CayaTzVD',
    accept: '*',
    'accept-language': 'zh-CN, zh',
    'user-agent': `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36`
  }
  private readonly logger = new Logger(WeiboService.name)
  private tags: string[] = ['热搜', '文娱', '要闻']

  constructor(private readonly httpService: HttpService) {}

  //? 热搜
  public async realtimehot() {
    const response = await this.getHtml(`${this.url}=realtimehot`)
    const $ = cheerio.load(response.data)
    const items = $('.list_a').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
          const url = $(item).attr('href')
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
    )
    return data
  }
  //? 要闻 新时代
  public async socialevent() {
    const response = await this.getHtml(`${this.url}=socialevent`)
    const $ = cheerio.load(response.data)
    const items = $('.list_b').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
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
    )
    return data
  }
  //? 文娱
  public async entrank() {
    const response = await this.getHtml(`${this.url}=realtimehot`, {
      'user-agent': ''
    })
    const $ = cheerio.load(response.data)
    const items = $('table tr')
    const data = await Promise.all(
      $(items)
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
    )
  }

  async getHtml(url: string, headers?: {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<string>(url, {
          headers: {
            ...this.headers,
            ...headers
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

  //? 话题
  public async topicband() {
    const response = await this.getHtml(`${this.url}=topicband`)
    const $ = cheerio.load(response.data)
    const items = $('.list_b').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
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
    )
    return data
  }

  public async start() {
    const url = 'https://passport.weibo.com/visitor/genvisitor'
    const headers = {
      'User-Agent':
        '"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36")'
    }

    const body = {
      cb: 'gen_callback',
      fp: {
        os: '1',
        browser: 'Chrome95,0,4621,0',
        fonts: 'undefined',
        screenInfo: '1920*1080*24',
        plugins:
          'Portable Document Format::internal-pdf-viewer::Chromium PDF Plugin|::mhjfbmdgcfjbbpaeojofohoefgiehjai::Chromium PDF Viewer'
      }
    }
    const cookieResponse = await firstValueFrom(
      this.httpService.post<string>(url, body, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
    console.log(cookieResponse)
  }

  public transformUrl(url: string) {
    return `https://s.weibo.com${url}`
  }
}
