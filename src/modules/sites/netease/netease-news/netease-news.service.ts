import { Injectable, Logger } from '@nestjs/common'
import {
  NeteaseNewsCommentItem,
  OriginNeteaseNewsCommentResponse,
  OriginNeteaseNewsRankResponse,
  OriginNeteaseNewsResponse,
  OriginNeteaseNewsSearchResponse,
  OriginNeteaseNewsTopicResponse,
  OriginNeteaseNewsVideoResponse
} from './netease-news.type'
import {
  NETEASE_NEWS_API,
  NETEASE_NEWS_CACHE_KEY
} from './netease-news.constant'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class NeteaseNewsService {
  private readonly logger = new Logger(NeteaseNewsService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  //#region 热议榜
  public async comment() {
    const res = await this.fetchService.get<OriginNeteaseNewsCommentResponse>(
      NETEASE_NEWS_API.COMMENT,
      { headers: this.headers }
    )
    const items = res.data.data.cmtDocs.map((item) => {
      const id = item.docId
      const originUrl = 'https://c.m.163.com/news/v/' + item.docId
      const title = item.doc_title
      const caption = item.wondCmtContent
      const thumbnailUrl = item.doc_image
      const video = item.videoInfo
      let type: string
      if (item.type === 'video') {
        type = item.type
        video.duration = item.videoInfo.length
      } else {
        type = 'image'
      }
      const author = {
        name: item.source
      }
      const stats = {
        hot: item.hotScore,
        comment: item.replyCount,
        users: item.user_images
      }
      return {
        id,
        originUrl,
        title,
        caption,
        type,
        thumbnailUrl,
        video,
        author,
        stats
      }
    })

    return items
  }
  //#endregion

  //#region 新闻榜
  public async hot() {
    const res = await this.fetchService.get<OriginNeteaseNewsRankResponse>(
      NETEASE_NEWS_API.HOT,
      {
        headers: this.headers
      }
    )

    const items = res.data.data.items.map((item) => {
      const id = item.contentId
      const title = item.title
      const originUrl = `https://c.m.163.com/news/a/${item.contentId}.html`
      const thumbnailUrl = item.img || item.imgUrls[0]
      const author = { name: item.source }
      const publishedDate = item.ptime
      let type: string
      if (item.type === 'doc') {
        type = 'image'
      } else {
        type = 'video'
      }
      const video = item.videoInfo
      if (type === 'video') {
        video.duration = item.videoInfo.length
      }
      const stats = {
        tags: [item.category],
        click: item.click,
        comment: item.commentCount,
        hot: item.hotValue,
        thread: item.threadVote,
        vote: item.votecount
      }
      return {
        id,
        title,
        originUrl,
        thumbnailUrl,
        author,
        publishedDate,
        type,
        video,
        stats
      }
    })

    return items
  }
  //#endregion

  //#region 搜索榜
  async search() {
    const res = await this.fetchService.get<OriginNeteaseNewsSearchResponse>(
      NETEASE_NEWS_API.SEARCH,
      {
        headers: this.headers
      }
    )
    const items = res.data.data.hotRank.map((item) => {
      const title = item.hotWord || item.searchWord
      const originUrl = 'https://www.163.com/search?keyword=' + title
      const stats = {
        exp: item.exp
      }
      return { title, originUrl, stats }
    })

    return items
  }
  //#endregion

  //#region 视频榜
  async video() {
    const res = await this.fetchService.get<OriginNeteaseNewsVideoResponse>(
      NETEASE_NEWS_API.VIDEO,
      {
        headers: this.headers
      }
    )
    const items = res.data.data.items.map((item) => {
      const id = item.contentId
      const title = item.title
      const video = item.videoInfo
      const author = {
        name: item.source
      }
      video.duration = item.videoInfo.length
      const thumbnailUrl = item.img
      const originUrl = `https://c.m.163.com/news/v/${id}.html`
      const stats = {
        hot: item.hotValue
      }
      const publishedDate = item.ptime
      return {
        id,
        title,
        thumbnailUrl,
        originUrl,
        stats,
        video,
        publishedDate,
        author
      }
    })

    return items
  }
  //#endregion

  //#region 话题榜
  async topic() {
    const res = await this.fetchService.get<OriginNeteaseNewsTopicResponse>(
      NETEASE_NEWS_API.TOPIC,
      {
        headers: this.headers
      }
    )
    const items = res.data.data.items.map((item) => {
      const title = item.title
      const id = item.topicId
      const originUrl = item.url
      const thumbnailUrl = item.headPicture
      const stats = {
        hot: item.heatScore || item.cursor
      }
      return { id, title, originUrl, thumbnailUrl, stats }
    })

    return items
  }
  //#endregion

  public async newsRank() {}
  public async newsSearch() {}
  public async newsVideo() {}
  public async newsTopic() {}
}
