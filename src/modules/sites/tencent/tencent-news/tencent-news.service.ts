import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import {
  TENCENT_NEWS_API,
  TENCENT_NEWS_CACHE_KEY
} from './tencent-news.constant'
import {
  OriginTencentNewsQuestionResponse,
  OriginTencentNewsRankResponse
} from './tencent-news.type'

@Injectable()
export class TencentNewsService {
  private readonly logger = new Logger(TencentNewsService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async rank() {
    const cache = await this.redisService.get(
      TENCENT_NEWS_CACHE_KEY.HOT_RANK_LIST
    )
    if (cache) return cache

    const response = await this.fetchService.get<OriginTencentNewsRankResponse>(
      TENCENT_NEWS_API.HOT_RANK_LIST,
      { headers: this.headers }
    )

    const items = response.data.idlist[0].newslist
      .filter(
        (item) =>
          !(
            item.id.includes('UTR') ||
            item.id.includes('RLV') ||
            item.id.includes('RLV') ||
            item.id.includes('TIP')
          )
      )
      //? ad
      .filter((item) => item.articletype !== ' 560')
      .filter((item) => item.hotEvent)
      .map((item) => {
        const tags = item.tag.filter((item) => item)
        const id = item.id
        const title = item.tlTitle || item.title || item.hotEvent.title
        const rank = item.ranking
        const caption =
          item.abstract || item.nlpAbstract || item.nlpContentAbstract
        const originUrl = item.url
        const thumbnailUrl = item.thumbnails || ''
        const publishedDate = +(item.hotEvent.hotScore.toString() + '000')
        const author = {
          name: item.uinnick
        }
        const stats = {
          tags: !!!tags.length ? [] : tags,
          hot: item.hotEvent.hotScore,
          comment: item.comments
        }

        return {
          id,
          rank,
          title,
          caption,
          originUrl,
          thumbnailUrl,
          publishedDate,
          author,
          stats
        }
      })
    const paginate = {
      hasMore: response.data.idlist[0].has_more
    }

    const data = { items, paginate }
    await this.redisService.set(TENCENT_NEWS_CACHE_KEY.HOT_RANK_LIST, data)
    return data
  }

  public async questions() {
    const cache = await this.redisService.get(
      TENCENT_NEWS_CACHE_KEY.HOT_QUESTION_LIST
    )
    if (cache) return cache

    const response =
      await this.fetchService.get<OriginTencentNewsQuestionResponse>(
        TENCENT_NEWS_API.HOT_QUESTION_LIST,
        { headers: this.headers }
      )
    const items = response.data.data.hot_questions.map((item) => {
      const title = item.title
      const thumbnailUrl = item.image
      const caption = item.main_points
      const originUrl = item.url
      const stats = {
        tags: [item.answer_tag].filter((item) => item),
        agree: item.approve_num
      }
      const author = {
        name: item.answer_name,
        avatarUrl: item.head_url
      }
      return { title, caption, thumbnailUrl, originUrl, author, stats }
    })

    const data = { items }

    await this.redisService.set(TENCENT_NEWS_CACHE_KEY.HOT_QUESTION_LIST, data)
    return data
  }
}
