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
  attached_info: string
  card_id: string
  feed_specific: { answer_count: number }
  answer_count: number
  id: string
  style_type: string
  target: {
    excerpt_area: { text: string }
    image_area: { url: string }
    label_area: {
      night_color: string
      normal_color: string
      trend: number
      type: 'trend'
    }
    link: { url: string }
    metrics_area: {
      background: string
      font_color: string
      text: string
      weight: string
    }
    title_area: {
      text: string
    }
  }
  type: 'hot_list_feed'
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
