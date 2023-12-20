import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RedisService } from 'src/shared/redis.service'
import { FetchService } from 'src/shared/fetch.service'
import { genUserAgent } from 'src/helpers'
import { _36KEntity } from './_36k.entity'
import * as cheerio from 'cheerio'
import {
  _36KLatestResponse,
  _36KPaginationItem,
  _36KRankCollectResponse,
  _36KRankCommentResponse,
  _36KRankHotResponse,
  _36KRankItem,
  _36KRankVideoResponse
} from './_36k.type'
import { _36K_API } from './_36k.constant'

//TODO: paginate - latest
//TODO: fields
@Injectable()
export class _36KService {
  private readonly logger = new Logger(_36KService.name)

  public headers = {
    'User-Agent': genUserAgent('desktop')
  }

  public payload = {
    partner_id: 'wap',
    param: {
      siteId: 1,
      platformId: 2
    },
    timestamp: new Date().getTime()
  }

  constructor(
    @InjectRepository(_36KEntity)
    private readonly repo: Repository<_36KEntity>,
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region 热榜 - 人气榜
  //? 每5分钟更新
  public async rankHot() {
    const response = await this.fetchService.post<_36KRankHotResponse>(
      _36K_API.RANK.HOT,
      {
        ...this.payload,
        timestamp: new Date().getTime()
      },
      {
        headers: this.headers
      }
    )

    const items = response.data.data.hotRankList
      .map((item: _36KRankItem) => {
        const id = item.itemId
        const title = item.templateMaterial.widgetTitle
        const thumbnailUrl = item.templateMaterial.widgetImage
        const originUrl = 'https://36kr.com/p/' + item.itemId
        const publishedDate = item.templateMaterial.publishTime
        const type = 'article'
        const author = {
          name: item.templateMaterial.authorName
        }
        const stats = {
          collect: item.templateMaterial.statCollect,
          comment: item.templateMaterial.statComment,
          format: item.templateMaterial.statFormat,
          like: item.templateMaterial.statPraise,
          read: item.templateMaterial.statRead
        }

        return {
          id,
          title,
          type,
          thumbnailUrl,
          author,
          originUrl,
          publishedDate,
          stats
        }
      })
      .filter((item) => item)

    return items
  }
  //#endregion

  //#region 热榜 - 视频榜
  public async rankVideo() {
    const url = _36K_API.RANK.VIDEO
    const response = await this.fetchService.post<_36KRankVideoResponse>(
      url,
      this.payload,
      { headers: this.headers }
    )
    const items = response.data.data.videoList.map((item) => {
      return {
        id: item.itemId,
        title: item.templateMaterial.widgetTitle,
        type: 'video',
        originUrl: 'https://36kr.com/video/' + item.itemId,
        thumbnailUrl: item.templateMaterial.widgetImage,
        createdAt: item.templateMaterial.publishTime,
        stats: {
          read: item.templateMaterial.statRead,
          duration: item.templateMaterial.duration
        }
      }
    })

    return items
  }
  //#endregion

  //#region 热榜 - 热议榜
  public async rankComment() {
    const url = _36K_API.RANK.COMMENT
    const response = await this.fetchService.post<_36KRankCommentResponse>(
      url,
      this.payload,
      { headers: this.headers }
    )
    const items = response.data.data.remarkList.map((item) => {
      return {
        id: item.itemId,
        title: item.templateMaterial.widgetTitle,
        type: 'article',
        originUrl: 'https://36kr.com/p/' + item.itemId,
        thumbnailUrl: item.templateMaterial.widgetImage,
        createdAt: item.templateMaterial.publishTime,
        stats: { comment: item.templateMaterial.statComment }
      }
    })

    return items
  }
  //#endregion

  //#region 热榜 - 收藏榜
  public async rankCollect() {
    const url = _36K_API.RANK.COLLECT
    const response = await this.fetchService.post<_36KRankCollectResponse>(
      url,
      this.payload,
      { headers: this.headers }
    )
    const items = response.data.data.collectList.map((item) => {
      return {
        id: item.itemId,
        title: item.templateMaterial.widgetTitle,
        type: 'article',
        originUrl: 'https://36kr.com/p/' + item.itemId,
        thumbnailUrl: item.templateMaterial.widgetImage,
        createdAt: item.templateMaterial.publishTime,
        stats: { collect: item.templateMaterial.statCollect }
      }
    })

    return items
  }
  //#endregion

  //#region 最新资讯
  public async latest(pageCallback: string = '') {
    //* 先访问网页获取<script>数据
    const getpageCallbackUrl = _36K_API.LATEST.PAGE_CALL_BACK
    //* wap
    const warUrl = _36K_API.LATEST.PAGINATE_WAP
    //* pc
    const webUrl = _36K_API.LATEST.PAGINATE_WEB

    //* 不是第一页
    if (pageCallback) {
      const payload = {
        partner_id: 'web',
        timestamp: new Date().getTime(),
        param: {
          subnavType: 1,
          subnavNick: 'web_news',
          pageSize: 30,
          pageEvent: 1,
          pageCallback,
          siteId: 1,
          platformId: 2
        }
      }
      const response = await this.fetchService.post<_36KLatestResponse>(
        webUrl,
        payload,
        { headers: this.headers }
      )

      const data = {
        items: this.transformPaginateData(response.data.data.itemList),
        meta: {
          pageCallback: response.data.data.pageCallback,
          hasNextPage: response.data.data.hasNextPage
        }
      }

      return data
    }

    let scripts = []
    const response = await this.fetchService.get<string>(getpageCallbackUrl, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data, { xmlMode: false })
    $('script').each((_, el) => {
      scripts.push($(el).text())
    })
    scripts = scripts.filter((item) => item)
    //? select the last script body
    const selectedScript = scripts[scripts.length - 1] as string
    const parse = JSON.parse(selectedScript.replace('window.initialState=', ''))
    const data = {
      items: this.transformPaginateData(
        parse.information.informationList.itemList
      ),
      meta: {
        pageCallback: parse.information.informationList.pageCallback,
        hasNextPage: parse.information.informationList.hasNextPage
      }
    }

    return data
  }
  //#endregion

  public transformPaginateData(items: _36KPaginationItem[]) {
    return (
      items
        //? ad
        .filter((item) => item.itemType !== 0)
        .map((item) => {
          const id = item.itemId
          const title = item.templateMaterial.widgetTitle
          const thumbnailUrl = item.templateMaterial.widgetImage
          const originUrl = 'https://36kr.com/p/' + id
          const author = {
            name: item.templateMaterial.authorName
          }
          const createdAt = item.templateMaterial.publishTime
          const tag = item.templateMaterial.navName
          return {
            id,
            title,
            author,
            createdAt,
            thumbnailUrl,
            originUrl,
            tag
          }
        })
    )
  }
}
