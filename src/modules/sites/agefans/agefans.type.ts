export const query = {
  genre: 'all',
  label: '后宫',
  letter: 'all',
  order: 'time',
  region: '日本',
  resource: 'all',
  season: 'all',
  status: '完结',
  year: 'all',
  page: 1,
  size: 10
}

export interface OriginAgefansCommentItem {
  code: number
  message: string
}
export interface OriginAgefansLatestItem {
  AID: number
  Href: string
  // 集数
  NewTitle: string
  PicSmall: string
  Title: string
}
export interface OriginAgefansResponse {
  sid: number
  content: string
  time: string
  uid: number
  username: string
  //? 番剧ID
  cid: number
  ip: string
  status: number
  floor: number
}
export interface OriginAgefansCommentResponse extends OriginAgefansResponse {
  data: {
    pagination: {
      total: number
      totalPage: number
      curPage: number
      pageCount: number
      pageNoList: number[]
    }
    comments: OriginAgefansCommentItem[]
  }
}
export interface OriginAgefansLatestResponse {
  total: number
  videos: OriginAgefansLatestItem[]
}
