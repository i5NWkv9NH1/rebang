export interface KrPaginationItem {
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
export interface KrRankItem {
  itemId: number
  itemType: number
  templateMaterial: {
    itemId: number
    templateType: number
    widgetImage: string
    widgetTitle: string
    publishTime: number
    authorName: string
    statRead: number
    statCollect: number
    statComment: number
    statPraise: number
    statFormat: string
  }
  route: string
  siteId: number
}
export interface KrResponse {
  code: number
}
export interface KrPaginationResponse extends KrResponse {
  data: {
    hasNextPage: number
    itemList: KrPaginationItem[]
    pageCallback: string
  }
}
export interface KrPaginationRequestPayload {
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
export interface KrTodayResponse extends KrPaginationResponse {}
export interface KrLatestResponse extends KrPaginationResponse {}
//* rank榜 - 热榜、视频、热议、收藏
export interface KrRankRequestPayload {
  partner_id: 'web' | 'wap'
  timestamp: number
  param: {
    siteId: number
    platformId: number
  }
}
export interface KrRankHotResponse extends KrResponse {
  data: {
    hotRankList: KrRankItem[]
  }
}
export interface KrRankVideoResponse extends KrResponse {
  data: {
    videoList: KrRankItem[]
  }
}
export interface KrRankCommentResponse extends KrResponse {
  data: {
    remarkList: KrRankItem[]
  }
}
export interface KrRankCollectResponse extends KrResponse {
  data: {
    collectList: KrRankItem[]
  }
}
