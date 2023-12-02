import { CommonItem } from 'src/shared/type'

export interface OriginHuxiuLatestItem {
  object_type: 1
  article_type: 1
  is_original: '0'
  aid: '2374630'
  title: '今年新增占超三成：“大爆发”的民宿都开在哪？'
  pic_path: 'https://img.huxiucdn.com/article/cover/202312/02/203504338440.jpg?imageView2/1/w/400/h/225/|imageMogr2/strip/interlace/1/quality/85/format/jpg'
  is_audio: '0'
  dateline: '1701525660'
  formatDate: '2小时前'
  share_url: 'https://m.huxiu.com/article/2374630.html'
  origin_pic_path: 'https://img.huxiucdn.com/article/cover/202312/02/203504338440.jpg'
  is_free: '0'
  is_sponsor: '0'
  is_vip_column_article: false
  summary: '同质化竞争下，优胜劣汰是未来的必然'
  is_hot: false
  count_info: {
    aid: 2374630
    catid: 0
    viewnum: 10494
    commentnum: 0
    total_comment_num: 0
    favtimes: 10
    sharetimes: 0
    agree: 1
    disagree: 0
    reply_num: 0
    rewardnum: '0'
  }
  user_info: {
    uid: '2225072'
    username: '财经十一人'
    avatar: 'https://img.huxiucdn.com/auth/data/avatar/002/22/50/72_1600749613.jpg?imageView2/1/w/60/h/60/|imageMogr2/strip/interlace/1/quality/85/format/jpg'
    type: '1'
    is_vip: 0
    is_team: 0
    is_author: 0
    is_talent: '0'
    author_level: 0
    yijuhua: '读有高度的商业'
    company: ''
    position: '媒体运营'
    is_del: '0'
    user_icons: null
    icon: []
  }
  pro_article_src: '0'
  pageSort: 1701525660
  big_pic_path: 'https://img.huxiucdn.com/article/cover/202312/02/203504338440.jpg?imageView2/1/w/1000/h/563/|imageMogr2/strip/interlace/1/quality/85/format/jpg'
  subtitle: '同质化竞争下，优胜劣汰是未来的必然'
  date: '2小时前'
  author: {
    id: '2225072'
    name: '财经十一人'
    avatarUrl: 'https://img.huxiucdn.com/auth/data/avatar/002/22/50/72_1600749613.jpg?imageView2/1/w/60/h/60/|imageMogr2/strip/interlace/1/quality/85/format/jpg'
  }
}
export interface OriginHuxiuEventItem {
  event_id: 1038
  name: '谁在拿出生证做交易？'
  cover_path: 'https://img.huxiucdn.com/event/202311/13/101810808589.jpg'
  publish_time: 1699847842
  style_type: 1
  image_type: 1
  sponsor_name: string
  introduce: '近日，湖北襄阳、广东佛山相继曝出医院贩卖出生证事件，涉事相关负责人目前均已被刑事拘留，相关调查侦办工作正在加紧进行。实际上，出生医学证明的签发机构有着非常严格的管理要求和签发流程。但是，在日益健全的法治环境下，仍有某些人出于暴利诱惑，铤而走险。此类“地下交易”事件为何屡禁不止？'
  multiple_view_num: 152340
  show_time: '2023-11-13'
  join_person_num: 152348
}
export interface OriginHuxiuTimelineItem {
  object_id: 909301
  object_type: 8
  pageSort: 1701523499
  moment_id: '909301'
  content: '国金证券：传感器清洗系统、激光雷达和V2X等，是非常明确的边际方向。<br><br>国金证券研报认为，L3+趋势加速，电动汽车正在走向电动智能网联汽车。从产业链边际角度看，传感器清洗系统、激光雷达和V2X等，是非常明确的边际方向。传感器清洗系统：L2+阶段，以算法清洗路线为主。L3+由于要解决CORNER CASE问题，物理清洗0-1趋势确定。从ASP看，电动车清洗ASP100元不到，传感器清洗系统1000元，ASP将有十倍级别增长。V2X：工信部试点文件明确提出要申报的试点城市需具备道路基础设施能力，道路侧配套需求有望受益；CNCAP2024版本即将发布施行，车侧前装需求趋势确定；12月初，华为将发布V2X标准，行业标准统一也已经在路上。制约V2X发展的道路侧、车侧和标准问题，都开始有重大边际变化。建议关注车侧、道路侧相关赛道的投资机会。'
  dateline: '2023-12-02'
  format_time: '2小时前'
  vote_id: '0'
  publish_time: '1701523499'
  url: ''
  comment_status: '2'
  comment_num: 0
  total_comment_num: 0
  agree_num: '1'
  favorite_num: '4'
  agree_icon: '0'
  is_agree: false
  is_favorite: false
  is_ai: true
  is_online_show: true
  is_ad: '0'
  label: ''
  ad_info: []
  user_info: {}
  is_follow: false
  comment: {}
  reward_info: {}
  is_allow_delete_comment: false
  share_url: 'https://m.huxiu.com/moment/909301.html'
}

export interface OriginHuxiuResponse {
  message: string
  success: boolean
}
export interface OriginHuxiuPaginationResponse extends OriginHuxiuResponse {
  data: {
    cur_page: number
    pagesize: number
    total: number
    total_page: number
    is_have_next_page?: boolean
    last_dateline?: number
    dataList?: any[]
    datalist?: any[]
  }
}
export interface OriginHuxiuTimelineResponse extends OriginHuxiuResponse {
  data: {
    is_spider: boolean
    moment_list: {
      cur_page: number
      datalist: {
        time: string
        datalist: OriginHuxiuTimelineItem[]
      }[]
      last_dateline: number
      pagesize: number
      total: number
      total_page: number
    }
    moment_live: {
      datalist: any[]
    }
  }
}
export interface HuxiuLatestItem extends CommonItem {
  formatDate: string
  author: {
    id: string | number
    name: string
    avatarUrl: string
    desc: string
    tag: string
  }
  status: {
    hot: boolean
    audio: boolean
    free: boolean
    sponsor: boolean
    original: boolean
  }
  stats: {
    view: number
    comment: number
    reply: number
    like: number
    agree: number
    disagree: number
    share: number
    reward: number
  }
}
export interface HuxiuEventItem extends CommonItem {
  stats: {
    view: number
    join: number
  }
  status: {
    sponsor: boolean
  }
}

export interface HuxiuTimelineItem extends CommonItem {}
