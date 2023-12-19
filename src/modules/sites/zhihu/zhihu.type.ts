import { IsNotEmpty, IsString } from 'class-validator'
import { CommonItem } from 'src/shared/type'

export class SetCookieDto {
  @IsString()
  @IsNotEmpty()
  cookie: string
}

//? web cralwer
export interface OriginZhihuWebItem {
  type: string
  id: string
  cardId: string
  feedSpecific: {
    answerCount: number
  }
  target: {
    titleArea: {
      text: string
    }
    excerptArea: {
      text: string
    }
    imageArea: {
      url: string
    }
    metricsArea: {
      text: string
      fontColor: string
      backGround: string
      weight: string
    }
    labelArea: {
      type: 'trend'
      trend: number
      nightColor: string
      normalColor: string
    }
    link: {
      url: string
    }
  }
}
export interface OriginZhihuWebResponse {
  initialState: {
    topstory: {
      recommend: {}
      follow: {}
      followWonderful: {}
      hotList: OriginZhihuWebItem[]
    }
  }
}

//? api
export interface OriginZhihuHotItem {
  type: string
  style_type: string
  id: string
  card_id: string
  target: {
    id: number
    title: string
    url: string
    type: string
    created: number
    answer_count: number
    follower_count: number
    author: {
      type: string
      user_type: string
      id: string
      url_token: string
      url: string
      name: string
      headline: string
      avatar_url: string
    }
    bound_topic_ids: number[]
    comment_count: number
    is_following: boolean
    excerpt: string
  }
  attached_info: string
  detail_text: string
  trend: number
  debut: boolean
  children: {
    type: string
    thumbnail: string
  }[]
}
export interface OriginZhihuPaginateResponse {
  paging: {
    is_end: boolean
    is_start: boolean
    next: string
    previous: string
    totals: number
  }
}
export interface OriginZhihuHotResponse extends OriginZhihuPaginateResponse {
  fresh_text: string
  display_first: boolean
  display_num: number
  fb_bill_main_rise: number
  data: OriginZhihuHotItem[]
}
export interface ZhihuItem extends CommonItem {
  stats: {
    hot: number
    answer: number
  }
}
