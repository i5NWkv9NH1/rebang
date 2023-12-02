import { CommonItem } from 'src/shared/type'

export interface OriginZhihuDailyItem {
  image_hue: string
  hint: string
  url: string
  image?: string
  images?: string[]
  title: string
  ga_prefix: string
  type: number
  id: number
}
export interface OriginZhihuDailyLatestResponse {
  date: string
  stories: OriginZhihuDailyItem[]
}
export interface OriginZhihuDailyContentResponse {
  id: number
  body: string
  title: string
  url: string
  image?: string
  //? 新闻详情带有大图和小图
  images?: string[]
}
export interface ZhihuDailyItem extends CommonItem {
  author: {
    name: string
  }
}
export interface ZhihuDailyResponse {}
