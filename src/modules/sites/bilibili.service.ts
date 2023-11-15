import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosProxyConfig } from 'axios'
import * as cheerio from 'cheerio'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'
import { genUserAgent } from 'src/helpers'

interface Tag {
  path: string
  name: string
}

@Injectable()
export class BiliBiliService {
  private logger = new Logger(BiliBiliService.name)
  private tags: Tag[] = [
    { path: '/hot', name: '热门' },
    { path: '/每周必看', name: '步行街' },
    { path: '/ent', name: '影视娱乐' }
  ]

  private headers = {}

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private httpService: HttpService
  ) {}

  //#region 热门
  //? 各个领域中新奇好玩的优质内容都在这里~
  public async hot(pageNumber: number = 1, pageSize: number = 100) {
    const url = `https://api.bilibili.com/x/web-interface/wx/hot?pn=${pageNumber}&ps=${pageSize}&teenage_mode=0`
    const userAgent = genUserAgent('mobile')
    const proxy = {
      host: '117.160.250.131',
      port: 8899,
      protocol: 'http'
    }
    interface ResponseData {
      code: number
      data: any[]
      message: string
      page: {
        // total
        count: number
        // pageNumber
        pn: number
        // pageSize
        ps: number
      }
    }
    const response = await this.http<ResponseData>(
      url,
      {
        ...this.headers,
        'user-agent': userAgent
      },
      proxy
    )

    const meta = {
      totalSize: response.data.page.count,
      pageNumber: response.data.page.pn,
      pageSize: response.data.page.ps
    }
    const reminder = '各个领域中新奇好玩的优质内容都在这里'
    const data = response.data.data.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.author,
        name: item.author.name,
        avatarUrl: item.author.face,
        url: `https://space.bilibili.com/${item.author.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })
    return {
      reminder,
      meta,
      data
    }
  }
  //#endregion

  //#region 每周必看
  //? 每周五晚 18:00 更新
  public async week() {
    const url =
      'https://api.bilibili.com/x/web-interface/popular/series/one?number=242'

    const response = await this.http<{
      data: { reminder: string; list: any[] }
    }>(url)
    const data = response.data.data.list.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.own,
        name: item.owner.name,
        avatarUrl: item.owner.face,
        url: `https://space.bilibili.com/${item.owner.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })
    const reminder = response.data.data.reminder
    return {
      reminder,
      data
    }
  }
  //#endregion

  //#region 排行榜
  //? 排行榜根据稿件内容质量，近期的数据综合展示，动态更新
  public async rank() {
    const url =
      'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all'
    const response = await this.http<{ data: { note: string; list: any[] } }>(
      url
    )

    const reminder = response.data.data.note
    const data = response.data.data.list.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.own,
        name: item.owner.name,
        avatarUrl: item.owner.face,
        url: `https://space.bilibili.com/${item.owner.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })

    return {
      reminder,
      data
    }
  }
  //#endregion

  public async http<T>(
    url: string,
    headers: {} = {},
    proxy?: AxiosProxyConfig
  ) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers,
          proxy
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error)
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
