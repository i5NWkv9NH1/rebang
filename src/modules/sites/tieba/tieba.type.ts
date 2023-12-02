import { CommonItem } from 'src/shared/type'

export interface OriginTiebaItem {
  topic_id: 20918942
  topic_name: '陈志朋回应偷税漏税'
  topic_desc: '陈志朋回应被举报偷漏税：已补缴税款，前员工所述为恶意捏造。此前，陈志朋前员工爆料其2019-2021年偷税漏税被罚补交1000多万，除此之外，员工还曝陈志朋不签劳动合同、拖欠工资，经常随意辱骂、 PUA员工。'
  abstract: '陈志朋回应被举报偷漏税：已补缴税款，前员工所述为恶意捏造。此前，陈志朋前员工爆料其2019-2021年偷税漏税被罚补交1000多万，除此之外，员工还曝陈志朋不签劳动合同、拖欠工资，经常随意辱骂、 PUA员工。'
  topic_pic: 'https://tiebapic.baidu.com/forum/pic/item/0ff41bd5ad6eddc44c29f5cd7fdbb6fd5266333d.jpg?tbpicau=2023-12-05-05_5f8640c2f1f76b60d93a769881379d62'
  tag: number
  discuss_num: 2800830
  idx_num: 1
  create_time: 1701401092
  content_num: 0
  topic_avatar: 'https://tiebapic.baidu.com/forum/whfpf%3D84%2C88%2C40%3Bq%3D90/sign=84d6c8371a6034a829b7ebc1ad2e7160/0ff41bd5ad6eddc44c29f5cd7fdbb6fd5266333d.jpg?tbpicau=2023-12-05-05_d33103ad3a01f87f852cff82bd4d0e82'
  is_video_topic: '0'
  topic_url: 'https://tieba.baidu.com/hottopic/browse/hottopic?topic_id=20918942&amp;topic_name=%E9%99%88%E5%BF%97%E6%9C%8B%E5%9B%9E%E5%BA%94%E5%81%B7%E7%A8%8E%E6%BC%8F%E7%A8%8E'
  topic_default_avatar: 'https://tb1.bdstatic.com/tb/%E8%AF%9D%E9%A2%98%E6%89%93%E5%BA%95%E5%9B%BE.PNG'
}

export interface OriginTiebaResponse {
  errmsg: string
  errno: number
}
export interface OriginTiebaHotResponse extends OriginTiebaResponse {
  data: {
    bang_head_pic: string
    bang_topic: {
      module_title: string
      topic_list: OriginTiebaItem[]
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

export interface TiebaItem extends CommonItem {}
