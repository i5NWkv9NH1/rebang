import { CommonItem } from 'src/shared/type'

export interface OriginToutiaoItem {
  ClusterId: number
  Title: string
  LabelUrl: string
  Label: string
  Url: string
  HotValue: string
  Schema: string
  LabelUri: {
    uri: string
    url: string
    width: number
    height: number
    url_list: { url: string }[]
    image_type: number
  }
  ClusterIdStr: string
  ClusterType: number
  QueryWord: string
  InterestCategory: string[]
  Image: {
    uri: string
    url: string
    width: number
    height: number
    url_list: { url: string }[]
    image_type: number
  }
  LabelDesc: string
}
export interface OriginToutiaoHotResponse {
  data: OriginToutiaoItem[]
  fixed_top_data: any[]
}

export interface ToutiaoItem extends CommonItem {}
