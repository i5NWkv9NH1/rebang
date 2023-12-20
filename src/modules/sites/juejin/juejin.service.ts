import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import {
  JUEJIN_API,
  JUEJIN_ARTICLE_TYPE,
  JUEJIN_CACHE_KEY,
  JUEJIN_ARTICLE_CATEGORY,
  JUEJIN_AUTHOR_TYPE,
  JUEJIN_AUTHOR_CATEGORY
} from './juejin.constant'
import {
  JuejinItem,
  OriginJuejinArticleItem,
  OriginJuejinAuthorResponse,
  OriginJuejinColumnResponse,
  OriginJuejinRankResponse,
  OriginJuejinRecCollectResponse
} from './juejin.type'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class JuejinService {
  private readonly logger = new Logger(JuejinService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  //? 掘金文章榜
  //? 文章收藏榜
  public async article(
    type: JUEJIN_ARTICLE_TYPE = JUEJIN_ARTICLE_TYPE.HOT,
    categoryId: JUEJIN_ARTICLE_CATEGORY = JUEJIN_ARTICLE_CATEGORY.MIX
  ) {
    const cacheKey = `${JUEJIN_CACHE_KEY.ARTICLE}/type/${type}/categoryId/${categoryId}`
    const cache = await this.redisService.get(cacheKey)
    if (cache) return cache

    const res = await this.fetchService.get<OriginJuejinRankResponse>(
      `${JUEJIN_API.ARTICLE}&type=${type}&category_id=${categoryId}`,
      { headers: this.headers }
    )

    const items = this.transformRankFields(res.data.data)

    await this.redisService.set(cacheKey, items)
    return items
  }

  public async column() {
    const cache = await this.redisService.get(JUEJIN_CACHE_KEY.COLUMN)
    if (cache) return cache

    const payload = { cursor: '', page_size: 30, sort_type: 2 }
    const res = await this.fetchService.post<OriginJuejinColumnResponse>(
      JUEJIN_API.COLUMN,
      payload,
      { headers: this.headers }
    )
    const items = res.data.data.map((item) => {
      const id = item.column.column_id
      const originUrl = 'https://juejin.cn/column/' + id
      const title = item.column.column_version.title
      const caption = item.column.column_version.content
      const thumbnailUrl = item.column.column_version.cover
      const author = {
        id: item.column.author.user_id,
        name: item.column.author.user_name,
        avatarUrl: item.column.author.avatar_large
      }
      const stats = {
        article: item.column.column.article_cnt,
        subscribe: item.column.column.follow_cnt
      }
      return { id, originUrl, title, caption, thumbnailUrl, author, stats }
    })

    await this.redisService.set(JUEJIN_CACHE_KEY.COLUMN, items)
    return items
  }

  public async recCollect() {
    const cache = await this.redisService.get(JUEJIN_CACHE_KEY.REC_COLLECT)
    if (cache) return cache

    const payload = {
      cursor: '',
      filter: { article_info: true },
      limit: 30,
      module_type: 0,
      sort_type: 2
    }
    const res = await this.fetchService.post<OriginJuejinRecCollectResponse>(
      JUEJIN_API.REC_COLLECT,
      payload,
      {
        headers: this.headers
      }
    )
    const items = res.data.data.map((item) => {
      const id = item.collection_set.creator_id
      const originUrl = 'https://juejin.cn/collection/' + id
      const title = item.collection_set.collection_name
      const author = {
        id: item.creator.user_id,
        name: item.creator.user_name,
        avatarUrl: item.creator.avatar_large
      }
      const stats = {
        article: item.collection_set.post_article_count,
        subscribe: item.collection_set.concern_user_count
      }

      return { id, originUrl, title, author, stats }
    })

    await this.redisService.set(JUEJIN_CACHE_KEY.REC_COLLECT, items)
    return items
  }

  public async author(
    type: JUEJIN_AUTHOR_TYPE = 1,
    categoryId: JUEJIN_AUTHOR_CATEGORY = JUEJIN_AUTHOR_CATEGORY.BE
  ) {
    const cacheKey = `${JUEJIN_CACHE_KEY.AUTHOR}/type/${type}/category/${categoryId}`
    const cache = await this.redisService.get(cacheKey)
    if (cache) return cache

    const payload = {
      item_rank_type: type,
      item_sub_rank_type: categoryId
    }
    const res = await this.fetchService.post<OriginJuejinAuthorResponse>(
      JUEJIN_API.AUTHOR,
      payload,
      { headers: this.headers }
    )

    const items = res.data.data.user_rank_list.map((item) => {
      const id = item.user_info.user_id
      const name = item.user_info.user_name
      const avatarUrl = item.user_info.avatar_large
      const originUrl = 'https://juejin.cn/user/' + id
      const caption = item.user_info.description
      const jobTitle = item.user_info.job_title
      const stats = {
        level: item.user_info.level,
        hot: item.hot_value,
        article: item.user_info.post_article_count,
        like: item.user_info.got_digg_count,
        collect: item.user_info.collection_set_article_count,
        follower: item.user_info.follower_count,
        following: item.user_info.followee_count,
        power: item.user_info.power,
        view: item.user_info.got_view_count
      }
      return { id, name, avatarUrl, originUrl, caption, jobTitle, stats }
    })
    await this.redisService.set(cacheKey, items)
    return items
  }

  public transformRankFields(items: OriginJuejinArticleItem[]): JuejinItem[] {
    return items.map((item) => {
      return {
        id: item.content.content_id,
        title: item.content.title,
        caption: item.content.brief,
        originUrl: 'https://juejin.cn/post/' + item.content.content_id,
        publishedDate: '',
        thumbnailUrl: '',
        stats: {
          collect: item.content_counter.collect,
          hot: item.content_counter.hot_rank,
          like: item.content_counter.like,
          view: item.content_counter.view,
          comment: item.content_counter.comment_count,
          interact: item.content_counter.interact_count
        },
        author: {
          id: item.author.user_id,
          name: item.author.name,
          avatarUrl: item.author.avatar
        }
      }
    })
  }
}
