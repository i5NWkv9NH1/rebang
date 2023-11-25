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
