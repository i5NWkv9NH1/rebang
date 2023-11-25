export interface TiebaResponse {
  errmsg: string
  errno: number
}
export interface TiebaHotResponse extends TiebaResponse {
  data: {
    bang_head_pic: string
    bang_topic: {
      module_title: string
      topic_list: any[]
    }
    manual_topic: {
      module_title: string
      topic_list: any[]
    }
    sug_topic: {
      module_title: string
      topic_list: any[]
    }
    user_his_topic: {
      module_title: string
      topic_list: any[]
    }
    timestamp: number
  }
}
