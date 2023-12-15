import { CommonItem } from 'src/shared/type'

export interface OriginJuejinAuthor {
  user_id: '3122268752057527'
  user_name: '鱼丸和粗面'
  company: 'Jaguar Land Rover'
  job_title: 'iOS 高级开发工程师'
  avatar_large: 'https://p26-passport.byteacctimg.com/img/user-avatar/1c51825ef511b1e838fe611611f0f7fa~300x300.image'
  level: 0
  description: 'iOS'
  followee_count: 21
  follower_count: 1
  post_article_count: 0
  digg_article_count: 146
  got_digg_count: 0
  got_view_count: 0
  post_shortmsg_count: 0
  digg_shortmsg_count: 2
  isfollowed: false
  favorable_author: 0
  power: 0
  study_point: 0
  university: {
    university_id: '0'
    name: ''
    logo: ''
  }
  major: {
    major_id: '0'
    parent_id: '0'
    name: ''
  }
  student_status: 0
  select_event_count: 0
  select_online_course_count: 0
  identity: 0
  is_select_annual: false
  select_annual_rank: 0
  annual_list_type: 0
  extraMap: {}
  is_logout: 0
  annual_info: []
  account_amount: 0
  user_growth_info: {
    user_id: 3122268752057527
    jpower: 0
    jscore: 132.6
    jpower_level: 0
    jscore_level: 3
    jscore_title: '新星掘友'
    author_achievement_list: []
    vip_level: 0
    vip_title: ''
    jscore_next_level_score: 150
    jscore_this_level_mini_score: 30
    vip_score: 0
  }
  is_vip: false
}

export interface OriginJuejinArticleItem {
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
export interface OriginJuejinColumnItem {
  description: string
  articles: any
  column: {
    author: OriginJuejinAuthor
    column: {
      column_id: string
      article_cnt: number
      ctime: number
      follow_cnt: number
      status: number
      top_status: number
      user_id: number
      content_sort_ids: number[]
    }
    column_id: string
    column_version: {
      title: string
      content: string
      cover: string
      audit_status: number
      ctime: number
      column_id: string
      version_id: string
    }
  }
}
export interface OriginJuejinRecCollectItem {
  collection_set: {
    collection_id: '6845244167304511502'
    collection_name: 'iOS'
    description: ''
    creator_id: '3122268752057527'
    post_article_count: 113
    concern_user_count: 25
    is_default: false
    permission: 0
    update_time: 1702641709
    is_follow: false
    is_article_in: false
  }
  description: string
  creator: OriginJuejinAuthor
}
export interface OriginJuejinAuthorItem {
  hot_value: number
  rank: number
  user_info: {
    user_id: '4406498336980103'
    user_name: 'waynaqua'
    company: 'king pig'
    job_title: '全栈、Java、Javascript、Python、Php开发'
    avatar_large: 'https://p26-passport.byteacctimg.com/img/user-avatar/532a7f62611cb7c6e4f1feee180e6939~300x300.image'
    level: 5
    description: '公众号：waynblog'
    followee_count: 73
    follower_count: 941
    post_article_count: 116
    digg_article_count: 171
    got_digg_count: 3656
    got_view_count: 423386
    post_shortmsg_count: 25
    digg_shortmsg_count: 2
    isfollowed: false
    favorable_author: 1
    power: 18767
    study_point: 0
    university: {
      university_id: '0'
      name: ''
      logo: ''
    }
    major: {
      major_id: '0'
      parent_id: '0'
      name: ''
    }
    student_status: 0
    select_event_count: 0
    select_online_course_count: 0
    identity: 0
    is_select_annual: false
    select_annual_rank: 0
    annual_list_type: 0
    extraMap: {}
    is_logout: 0
    annual_info: []
    account_amount: 0
    user_growth_info: {
      user_id: 4406498336980103
      jpower: 18767
      jscore: 3023.1
      jpower_level: 5
      jscore_level: 6
      jscore_title: '杰出掘友'
      author_achievement_list: [1]
      vip_level: 0
      vip_title: ''
      jscore_next_level_score: 7000
      jscore_this_level_mini_score: 2000
      vip_score: 0
    }
    is_vip: false
    become_author_days: 1366
    collection_set_article_count: 64
    recommend_article_count_daily: 89
    article_collect_count_daily: 7349
    user_priv_info: {
      administrator: 0
      builder: 0
      favorable_author: 0
      book_author: 0
      forbidden_words: 0
      can_tag_cnt: 0
      auto_recommend: 0
      signed_author: 0
      popular_author: 0
      can_add_video: 0
    }
  }
}

export interface OriginJuejinResponse {
  err_msg: string
  err_no: number
}
export interface OriginJuejinRankResponse extends OriginJuejinResponse {
  data: OriginJuejinArticleItem[]
}
export interface OriginJuejinColumnResponse extends OriginJuejinResponse {
  data: OriginJuejinColumnItem[]
}
export interface OriginJuejinRecCollectResponse extends OriginJuejinResponse {
  data: OriginJuejinRecCollectItem[]
}
export interface OriginJuejinAuthorResponse extends OriginJuejinResponse {
  data: {
    item_rank_type: number
    item_sub_rank_type: string
    rank_period: { year: number; period: number }
    rank_time: number
    user_rank_list: OriginJuejinAuthorItem[]
  }
}

export interface JuejinItem extends CommonItem {}
