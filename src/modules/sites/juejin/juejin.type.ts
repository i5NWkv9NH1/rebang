import { CommonItem } from 'src/shared/type'

export interface OriginJuejinItem {
  content: {
    content_id: '7296751524809048073'
    item_type: 2
    format: ''
    author_id: '3157453125203870'
    title: '去掉 if...else 的七种绝佳之法...'
    brief: ''
    status: 2
    ctime: 0
    mtime: 0
    category_id: '6809637769959178254'
    tag_ids: ['6809640408797167623', '6809640445233070094']
  }
  content_counter: {
    view: 16451
    like: 161
    collect: 344
    hot_rank: 9198
    comment_count: 39
    interact_count: 200
  }
  author: {
    user_id: '3157453125203870'
    name: '大明哥_'
    avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/38aa2502027886688e08dfec7012ad11~300x300.image'
    is_followed: false
    avatarUrl: 'https://p9-passport.byteacctimg.com/img/user-avatar/38aa2502027886688e08dfec7012ad11~300x300.image'
  }
  author_counter: {
    level: 4
    power: 2443
    follower: 0
    followee: 0
    publish: 0
    view: 0
    like: 0
    hot_rank: 0
  }
  user_interact: {
    is_user_like: false
    is_user_collect: false
    is_follow: false
  }
  title: '去掉 if...else 的七种绝佳之法...'
  metrics: {
    view: 16451
    like: 161
    collect: 344
    hot_rank: 9198
    comment_count: 39
    interact_count: 200
  }
}
export interface OriginJuejinResponse {
  err_msg: string
  err_no: number
  data: OriginJuejinItem[]
}

export interface JuejinItem extends CommonItem {}
