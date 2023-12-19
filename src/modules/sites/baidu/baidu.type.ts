import { CommonItem } from 'src/shared/type'

export interface OriginBaiduRankItem {}
export interface OriginBaiduRankResponse {}

export interface BaiduRankItem extends CommonItem {
  status: {
    top: boolean
  }
  stats: {
    hot: number
  }
}
