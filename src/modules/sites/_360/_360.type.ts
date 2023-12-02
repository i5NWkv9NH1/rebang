import { CommonItem } from 'src/shared/type'

export interface Origin_360Item {
  img_url: string
  news_url: string
  status: string
  long_title: string
  rank: string
  url: string
  newscard_imgurl: string
  index: string
  murl: string
  face: string
  rise: string
  hot_src: string
  ifnew: string
  title: string
  updateTime: string
  recordTime: string
  keyword: string
  score: string
  sumtxt: string
  category: string
}
export type Origin_360RankResponse = Origin_360Item[]

export interface _360Item extends CommonItem {
  status: {
    fresh: boolean
  }
}
