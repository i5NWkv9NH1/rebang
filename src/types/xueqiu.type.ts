export interface XueqiuLivenewsRequestPayload {
  sinceId: number
  maxId: number
  pageSize: number
}
export interface XueqiuHotRequestPayload {
  //* count
  pageSize: 10
  //* page
  currentPage: 1
  scope: 'day'
  type: 'notice' | 'news'
}

export interface XueqiuResponse {}
export interface XueqiuLivenewsResponse extends XueqiuResponse {
  items: any[]
  next_id: number
  next_max_id: number
}
export interface XueqiuHotResponse extends XueqiuResponse {
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

export interface XueqiuHotStockRequestPayload {
  size: number
  //? 10 - 热门股
  //? 12 - 泸深
  //? 13 - 港股
  //? 11 - 美股
  _type: number
  type: number
}

export interface XueqiuHotStockResponse extends XueqiuResponse {
  data: {
    items: any[]
    items_size: number
  }
  error_code: number
  error_description: string
}
