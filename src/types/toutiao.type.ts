// export interface ToutiaoItem {
//   raw_data: {
//     title: string
//     title_label_desc: string
//     title_label_image: {
//       url: string
//     }
//   }
// }
export interface ToutiaoItem {
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
// export interface ToutiaoHotResponse {
//   data: {
//     code: string
//     content: string
//   }[]
//   sub_entrance_list: any[]
//   errno: number
//   message: string
//   total_number: number
//   has_more: boolean
//   login_status: number
//   show_et_status: number
//   post_content_hint: string
//   has_more_to_refresh: boolean
//   action_to_last_stick: number
//   sub_entrance_style: number
//   feed_flag: number
//   tips: {
//     type: string
//     display_duration: number
//     display_info: string
//     display_template: string
//     open_url: string
//     web_url: string
//     download_url: string
//     app_name: string
//     package_name: string
//     stream_resp_cnt: number
//   }
//   follow_recommend_tips: string
//   hide_topcell_count: number
//   is_use_bytedance_stream: boolean
//   get_offline_pool: boolean
//   api_base_info: {
//     info_type: number
//     raw_data: string
//   }
//   show_last_read: boolean
//   last_response_extra: {
//     data: string
//   }
//   offset: number
//   tail: string
//   extra: string
// }
export interface ToutiaoHotResponse {
  data: ToutiaoItem[]
  fixed_top_data: any[]
}
