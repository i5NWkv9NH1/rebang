import { CommonItem } from 'src/shared/type'

export interface OriginZhihuItem {
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
export interface OriginZhihuResponse {
  initialState: {
    topstory: {
      recommend: {}
      follow: {}
      followWonderful: {}
      hotList: OriginZhihuItem[]
    }
  }
}
export interface ZhihuItem extends CommonItem {
  stats: {
    hot: number
    answer: number
  }
}
export interface ZhihuResponse {}
