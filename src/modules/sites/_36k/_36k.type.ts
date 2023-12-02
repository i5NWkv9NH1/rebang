export interface _36KPaginationItem {
  itemId: number
  itemType: number
  templateMaterial: {
    itemId: number
    templateType: number
    widgetImage: string
    publishTime: number
    widgetTitle: string
    summary: string
    authorName: string
    authorRoute: string
    navName: string
    navRoute: string
    themeName: string
    themeRoute: string
  }
  route: string
  siteId: number
}
export interface _36KRankItem {
  itemId: number
  itemType: number
  templateMaterial: {
    itemId: number
    templateType: number
    widgetImage: string
    widgetTitle: string
    publishTime: number
    authorName: string
    statRead?: number
    statCollect?: number
    statComment?: number
    statPraise?: number
    statFormat?: string
    duration?: number
  }
  route: string
  siteId: number
}
export interface _36KResponse {
  code: number
}
export interface _36KPaginationResponse extends _36KResponse {
  data: {
    hasNextPage: number
    itemList: _36KPaginationItem[]
    pageCallback: string
  }
}
export interface _36KPaginationRequestPayload {
  partner_id: 'web' | 'wap'
  timestamp: number
  param: {
    pageSize: number
    pageEvent: number
    pageCallback: string
    siteId: number
    platformId: number
  }
}

//* 分页
export interface _36kTodayResponse extends _36KPaginationResponse {}
export interface _36KLatestResponse extends _36KPaginationResponse {}
//* rank榜 - 热榜、视频、热议、收藏
export interface KrRankRequestPayload {
  partner_id: 'web' | 'wap'
  timestamp: number
  param: {
    siteId: number
    platformId: number
  }
}
export interface _36KRankHotResponse extends _36KResponse {
  data: {
    hotRankList: _36KRankItem[]
  }
}
export interface _36KRankVideoResponse extends _36KResponse {
  data: {
    videoList: _36KRankItem[]
  }
}
export interface _36KRankCommentResponse extends _36KResponse {
  data: {
    remarkList: _36KRankItem[]
  }
}
export interface _36KRankCollectResponse extends _36KResponse {
  data: {
    collectList: _36KRankItem[]
  }
}
