export enum OriginITHomeHotType {
  //* 阅读
  READ = 1,
  //* 最热
  RANK,
  //* 评分
  TOP
}
export interface OriginITHomeNewsItem {
  title: string
  author: string
  editor: string
  tougaoUserIds: number[]
  sourceName: string
  link: string
  shareUrl: string
  shareContent: string
  shareImage: any
  rank?: string
  tags: {
    id: number
    keyword: string
    link: string
  }[]
  content: string
  imageType: 0
  images: string[]
  postDate: string
  orderTime: string
  flag: number
  commentCount: number
  itAccount: any
  smallTags: any[]
  newsVoices: any
  lastUpdateTimeStamp: number
  feedLabel: any
  highlightWords: any[]
  feedLabels: any[]
  imageRatio: number
  id: number
  anchor: any
  itemType: number
}
export interface OriginITHomeMenuItem {
  id: number
  apiUrl: string
  title: string
  type: number
  flag: number
  flowType: number
  navTitle: string
  parentId: number
}
export interface OriginITHomeHotItem {
  feedType: number
  feedContent: {
    rank: string
    newsData?: OriginITHomeNewsItem
    text?: string
  }
}
export interface OriginITHomeResponse {
  dialogInfo: any
  traceId: any
  errorMessage: any
  success: string
  host: any
  messageType: any
  showType: any
  errorCode: any
}
export interface OriginITHomeMenusResponse extends OriginITHomeResponse {
  data: {
    showTopMenus: OriginITHomeMenuItem[]
  }
}
export interface OriginITHomeHotResponse extends OriginITHomeResponse {
  data: {
    hasMore: boolean
    list: OriginITHomeHotItem[]
    stamp: string
  }
}
