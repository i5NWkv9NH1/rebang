export interface OriginXueqiuLivenewsRequestPayload {
  sinceId: number
  maxId: number
  pageSize: number
}
export interface OriginXueqiuHotRequestPayload {
  //* count
  pageSize: 10
  //* page
  currentPage: 1
  scope: 'day'
  type: 'notice' | 'news'
}

export interface OriginXueqiuResponse {}
export interface OriginXueqiuLivenewsResponse extends OriginXueqiuResponse {
  items: any[]
  next_id: number
  next_max_id: number
}
export interface OriginXueqiuHotResponse extends OriginXueqiuResponse {
  code: number
  data: any[]
  message: string
  meta: {
    count: number
    feedback: number
    has_next_page: boolean
    maxPage: number
    page: number
    query_id: number
    size: number
  }
  success: boolean
}

export interface OriginXueqiuHotStockRequestPayload {
  size: number
  //? 10 - 热门股
  //? 12 - 泸深
  //? 13 - 港股
  //? 11 - 美股
  _type: number
  type: number
}

export interface OriginXueqiuHotStockResponse extends OriginXueqiuResponse {
  data: {
    items: any[]
    items_size: number
  }
  error_code: number
  error_description: string
}
