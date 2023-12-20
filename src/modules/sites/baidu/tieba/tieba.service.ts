import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { TIEBA_API } from './tieba.constant'
import {
  OriginTiebaTopicItem,
  OriginTiebaTopicListResponse,
  TiebaItem
} from './tieba.type'

@Injectable()
export class TiebaService {
  private readonly logger = new Logger(TiebaService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(private readonly fetchService: FetchService) {}

  public async topicList() {
    const url = TIEBA_API.TOPIC_LIST
    const response = await this.fetchService.get<OriginTiebaTopicListResponse>(
      url,
      {
        headers: this.headers
      }
    )

    const items: TiebaItem[] = this.tranformFields(
      response.data.data.bang_topic.topic_list
    )

    return items
  }

  public tranformFields(items: OriginTiebaTopicItem[]): TiebaItem[] {
    return items.map((item) => {
      return {
        id: item.topic_id,
        title: item.topic_name,
        caption: item.topic_desc || item.abstract,
        thumbnailUrl: item.topic_pic,
        publishedDate: +(item.create_time + '000'),
        originUrl: item.topic_url,
        stats: {
          hot: item.discuss_num
        },
        status: {
          hot: item.tag === 2,
          new: item.tag === 1
        }
      }
    })
  }
}
