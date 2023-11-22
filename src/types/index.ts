export * from './baidu.type'
export * from './zhihu.type'
export * from './toutiao.type'
export type Tag = {
  path: string
  name: string
}

//#region  bilibili
export interface BiliBiliReponse {
  code: number
  message: string
}
export interface BilibiliHotResponse extends BiliBiliReponse {
  data: any[]
  page: {
    // total
    count: number
    // pageNumber
    pn: number
    // pageSize
    ps: number
  }
}
export interface BilibiliWeekResponse extends BiliBiliReponse {
  data: {
    reminder: string
    list: any[]
  }
}

export interface BiliBiliRankResponse extends BiliBiliReponse {
  data: {
    note: string
    list: any[]
  }
}
//#endregion

//#region huxiu
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
//#endregion
