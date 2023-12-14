import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CommonItem } from 'src/shared/type'

export class GetVerifyCodeDto {
  @IsNotEmpty({ message: `手机号不能为空` })
  @IsString({ message: `手机号必须为字符串` })
  phone: string
}
export class LoginDto extends GetVerifyCodeDto {
  @IsNotEmpty({ message: `验证码不能为空` })
  @IsString({ message: `验证码必须为字符串` })
  smscode: string

  @IsNotEmpty()
  @IsNumber()
  getuser: number = 0

  @IsNotEmpty()
  @IsNumber()
  getcookie: number = 1

  @IsNotEmpty()
  @IsNumber()
  getoauth: number = 1
}

export interface OriginWeiboLoginResponse {
  screen_name: '在雾里告别yukino'
  status: 1
  gsid: '_2A25IfpSaDeRxGeNM71AS9irFyjyIHXVpLa9SrDV6PUJbkdAGLUr8kWpNTgqu_IXm78ad1xF-_5BEUboxdF-LrCS6'
  uid: '5242364910'
  url: 'http://weibo.cn'
  msg_url: 'http://weibo.cn/msg'
  passwdState: '0'
  malt: ''
  user_type: '1'
  interceptad_type: ''
  goto_scheme: ''
  user: {
    id: 5242364910
    idstr: '5242364910'
    class: 1
    screen_name: '在雾里告别yukino'
    name: '在雾里告别yukino'
    province: '400'
    city: '1000'
    location: '海外'
    description: '肥宅'
    url: ''
    profile_image_url: 'https://tvax3.sinaimg.cn/crop.0.0.812.812.50/005IMqAKly8hhhib20iarj30mk0mkwic.jpg?KID=imgbed,tva&Expires=1702563578&ssig=8XkTJyGst5'
    light_ring: false
    cover_image: 'https://wx3.sinaimg.cn/crop.0.0.920.300/005IMqAKgy1fj6lpv07cjj30pk08cdoo.jpg'
    cover_image_phone: 'https://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg'
    profile_url: 'azesink'
    domain: 'azesink'
    weihao: ''
    gender: 'f'
    followers_count: 1878
    followers_count_str: '1878'
    friends_count: 98
    pagefriends_count: 3
    statuses_count: 0
    video_status_count: 0
    video_play_count: 0
    super_topic_not_syn_count: 0
    favourites_count: 13
    created_at: string
    following: false
    allow_all_act_msg: false
    geo_enabled: true
    verified: false
    verified_type: -1
    remark: ''
    insecurity: {
      sexual_content: false
    }
    ptype: 0
    allow_all_comment: true
    avatar_large: string
    avatar_hd: string
    verified_reason: ''
    verified_trade: ''
    verified_reason_url: ''
    verified_source: ''
    verified_source_url: ''
    follow_me: false
    like: false
    like_me: false
    online_status: 0
    bi_followers_count: 3
    lang: 'en'
    star: 0
    mbtype: 2
    mbrank: 1
    svip: 0
    vvip: 0
    mb_expire_time: 1508255999
    block_word: 0
    block_app: 0
    level: 1
    type: 1
    ulevel: 0
    user_limit: 0
    badge: {}
    badge_top: ''
    has_ability_tag: 0
    extend: {
      privacy: {
        mobile: 0
      }
      mbprivilege: '0000000000000000000000000000000000000000000000000000000000400208'
    }
    chaohua_ability: 0
    brand_ability: 0
    nft_ability: 0
    vplus_ability: 0
    wenda_ability: 0
    live_ability: 0
    gongyi_ability: 0
    paycolumn_ability: 0
    newbrand_ability: 0
    ecommerce_ability: 0
    hardfan_ability: 0
    wbcolumn_ability: 0
    interaction_user: 0
    audio_ability: 0
    credit_score: 80
    user_ability: 2100232
    avatargj_id: 'gj_vip_027'
    urank: 27
    story_read_state: -1
    vclub_member: 0
    is_teenager: 0
    is_guardian: 0
    is_teenager_list: 0
    pc_new: 7
    special_follow: false
    planet_video: 0
    video_mark: 0
    live_status: 0
    user_ability_extend: 0
    status_total_counter: {
      total_cnt: 0
      repost_cnt: 0
      comment_cnt: 0
      like_cnt: 0
      comment_like_cnt: 0
    }
    video_total_counter: {
      play_cnt: -1
    }
    brand_account: 0
    hongbaofei: 0
    tab_manage: '[0, 0]'
    green_mode: 0
    urisk: 0
    unfollowing_recom_switch: 1
    block: 0
    block_me: 0
    avatar_type: 0
    is_big: 0
    auth_status: 0
    auth_realname: null
    auth_career: null
    auth_career_name: null
    show_auth: 0
    member_type: 2
  }
  switch_unread_feed: 0
  cookie: {
    uid: '5242364910'
    cookie: {
      '.sina.com.cn': 'SUB=_2A25IfpSaDeRhGeNM71AS9irFyjyIHXVr08bSrDV_PUJbitAGLWrkkWtNTgqu_J87RnEXNSIr5rN_3bkpFDA2Quy8; path=/; domain=.sina.com.cn; secure; httponly; expires=Fri, 15-Dec-2023 08:19:38 GMT\nSUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFHrbXDsNSZf-kl1vOv80B45NHD95QfeoBEe0qX1K27Ws4Dqcj0i--fiKLhi-2Ri--4iKLFi-i8i--4iKnNiKyhi--fiK.piKyWi--fiKnRi-8FwPHuIg4a; expires=Friday, 13-Dec-2024 11:19:38 GMT; path=/; domain=.sina.com.cn; secure'
      '.sina.cn': 'SUB=_2A25IfpSZDeRhGeNM71AS9irFyjyIHXVr08bRrDV9PUJbitAGLUb4kWtNTgqu_EENn3KgxtyZSolwFUwUxjxBuik4; path=/; domain=.sina.cn; secure; httponly; expires=Fri, 15-Dec-2023 08:19:38 GMT\nSUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFHrbXDsNSZf-kl1vOv80B45NHD95QfeoBEe0qX1K27Ws4Dqcj0i--fiKLhi-2Ri--4iKLFi-i8i--4iKnNiKyhi--fiK.piKyWi--fiKnRi-8FwPHuIg4a; expires=Friday, 13-Dec-2024 11:19:38 GMT; path=/; domain=.sina.cn; secure'
      '.weibo.com': 'SUB=_2A25IfpSZDeRhGeNM71AS9irFyjyIHXVr08bRrDV8PUJbitAGLRPxkWtNTgqu_G8qy7cIh_y1B_9RNmO5CIR3HVnu; path=/; domain=.weibo.com; secure; httponly; expires=Fri, 15-Dec-2023 08:19:38 GMT\nSUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFHrbXDsNSZf-kl1vOv80B45NHD95QfeoBEe0qX1K27Ws4Dqcj0i--fiKLhi-2Ri--4iKLFi-i8i--4iKnNiKyhi--fiK.piKyWi--fiKnRi-8FwPHuIg4a; expires=Friday, 13-Dec-2024 11:19:38 GMT; path=/; domain=.weibo.com; secure'
      '.weibo.cn': 'SUB=_2A25IfpSZDeRhGeNM71AS9irFyjyIHXVr08bRrDV6PUJbitAGLRTMkWtNTgqu_DFT-vsf_W4tZX4gvpu0BlAD6wSD; path=/; domain=.weibo.cn; secure; httponly; expires=Fri, 15-Dec-2023 08:19:38 GMT\nSUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFHrbXDsNSZf-kl1vOv80B45NHD95QfeoBEe0qX1K27Ws4Dqcj0i--fiKLhi-2Ri--4iKLFi-i8i--4iKnNiKyhi--fiK.piKyWi--fiKnRi-8FwPHuIg4a; expires=Friday, 13-Dec-2024 11:19:38 GMT; path=/; domain=.weibo.cn; secure'
    }
    expire: 1702624778
  }
  is_register: 0
}

export interface OriginWeiboTopicPayload {
  sid: 'v_weibopro'
  category: 'all'
  page: number
  count: number
}
export interface OriginWeiboResponse {
  ok: number
}
export interface WeiboTopicItem extends CommonItem {
  stats: {
    read: number
    comment: number
  }
  rank: number
}
export interface WeiboHotSearchItem extends CommonItem {}
export interface WeiboNewsItem extends CommonItem {}
export interface WeiboEntrankItem extends CommonItem {}
export interface OriginWeiboHotSearchItem {
  ad_info: string
  is_ad?: number
  category: string
  channel_type: string
  emoticon: string
  expand: number
  extension: number
  flag: number
  fun_word: number
  icon_desc: '热'
  icon_desc_color: '#ff9406'
  is_gov?: number
  is_hot?: number
  is_new?: number
  is_fei?: number
  label_name: '热'
  mid: string
  note: string
  num: number
  onboard_time: number
  rank: number
  raw_hot: number
  realpos: number
  small_icon_desc: '热'
  small_icon_desc_color: '#ff9406'
  star_name: {}
  star_word: number
  subject_label: string
  subject_querys: string
  topic_flag: number
  word: string
  word_scheme: string
}
export interface OriginWeiboNewsItem {
  category: string
  claim: string
  dot_icon: number
  images_url: string
  mention: number
  rank: number
  read: number
  summary: string
  topic: string
}
export interface OriginWeiboTopicItem {
  topic: string
  rank: number
  read: number
  summary: string
  mid: string
  mention: number
  //? tvax1.sinaimg.cn
  images_url: string
  claim: string
  category: string
  mblog: {
    pic_num: number
    pic_ids: string[]
    text: string
    topic_struct: {
      topic_title: string
      topic_url: string
    }[]
  }
}
export interface OriginWeiboEntrankItem {
  ad_info: {}
  category: '音乐'
  channel_type: '1_文娱|文娱c01|3_单条|4_单条视频作品|4_文娱单条视频作品|GRADE_A|GREAT_A_plus|招牌热点'
  circle_hot: 1688020
  display_flag: '热'
  emoticon: ''
  ever_in_board: '1'
  expand: 0
  flag: 2
  grade: 'A'
  hot_num: 1688020
  hot_rank_position: 1
  icon_desc: '热'
  icon_desc_color: '#ff9406'
  imp_support: 0
  imp_support_time: 0
  is_hot?: number
  is_new?: number
  is_fei?: number
  main_board_flag: 2
  manual_grade: 'E'
  mid: ''
  muse_mark: '1'
  note: string
  num: 1688020
  on_main_board_time: 1702548758
  onboard_time: 1702548540
  out_index: 88
  realpos: 1
  scene_flag: 1
  small_icon_desc: '热'
  small_icon_desc_color: '#ff9406'
  star_name: {}
  subject_querys: {}
  topic_flag: 0
  topic_image: string
  word: string
  word_scheme: string
}
export interface OriginWeiboHotSearchResponse extends OriginWeiboResponse {
  data: {
    hotgov: OriginWeiboHotSearchItem
    hotgovs: OriginWeiboHotSearchItem[]
    realtime: OriginWeiboHotSearchItem[]
  }
}
export interface OriginWeiboNewsResponse extends OriginWeiboResponse {
  data: {
    band_list: OriginWeiboNewsItem[]
  }
}
export interface OriginWeiboTopicResponse extends OriginWeiboResponse {
  http_code: number
  data: {
    category: string
    statuses: OriginWeiboTopicItem[]
    total_data_num: number
    total_num: number
  }
}
export interface OriginWeiboEntrankResponse extends OriginWeiboResponse {
  data: {
    band_list: OriginWeiboEntrankItem[]
  }
}
