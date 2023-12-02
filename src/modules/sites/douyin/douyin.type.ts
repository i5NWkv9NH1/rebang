import { CommonItem } from 'src/shared/type'

export interface DouyinResponse {
  status_code: number
}

export interface DouyinRankResponse extends DouyinResponse {}

export interface DouyinRankHotResponse extends DouyinRankResponse {
  data: {
    active_time: string
    recommend_list: any[]
    word_list: any[]
    trending_list: any[]
  }
}

export interface DouyinItem extends CommonItem {
  stats: {
    hot: number
  }
}
