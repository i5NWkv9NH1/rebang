import { CommonItem } from 'src/shared/type'

export interface OriginBiliBiliReponse {
  code: number
  message: string
}
export interface OriginBilibiliHotResponse extends OriginBiliBiliReponse {
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
export interface OriginBilibiliWeekResponse extends OriginBiliBiliReponse {
  data: {
    reminder: string
    list: any[]
  }
}

export interface OriginBiliBiliRankResponse extends OriginBiliBiliReponse {
  data: {
    note: string
    list: any[]
  }
}

export interface BiliBiliItem extends CommonItem {}
