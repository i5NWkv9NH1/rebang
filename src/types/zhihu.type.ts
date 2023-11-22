export interface ZhihuDailyResponse {}
export interface ZhihuDailyLatestResponse extends ZhihuDailyResponse {
  date: string
  stories: any[]
}
export interface ZhihuDailyContentResponse extends ZhihuDailyResponse {
  id: number
  body: string
  title: string
  url: string
  image: string
  //? 新闻详情带有大图和小图
  images: string[]
}
