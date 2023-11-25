export interface HuxiuResponse {
  message: string
  success: boolean
}
export interface HuxiuPaginationResponse extends HuxiuResponse {
  data: {
    cur_page: number
    pagesize: number
    total: number
    total_page: number
    is_have_next_page?: boolean
    last_dateline?: number
    dataList?: any[]
    datalist?: any[]
  }
}
export interface HuxiuTimelineResponse extends HuxiuResponse {
  data: {
    is_spider: boolean
    moment_list: {
      cur_page: number
      datalist: {
        time: string
        datalist: any[]
      }[]
      last_dateline: number
      pagesize: number
      total: number
      total_page: number
    }
    moment_live: {
      datalist: any[]
    }
  }
}
