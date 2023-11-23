export interface HuxiuResponse {
  message: string
  success: boolean
}
export interface HuxiuLatestResponse extends HuxiuResponse {
  data: {
    cur_page: number
    dataList: any[]
    is_have_next_page: boolean
    last_dateline: number
    pagesize: number
    total: number
    total_page: number
  }
}
