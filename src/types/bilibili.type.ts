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
