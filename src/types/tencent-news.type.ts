//#region Item
interface NewsItem {
  id: string
  a_ver: string
  articletype: '0' | '560'
  title: string
  chlid: string
  commentid: string
  longtitle: string
  surl: string
  short_url: string
  url: string
  time: string
  timestamp: number
  abstract: string
  alg_version: number
  card: {
    chlid: string
    chlname: string
    desc: string
    icon: string
    sicon: string
    uin: string
    update_frequency: string
    vip_desc: string
    vip_icon_night: string
    vip_place: string
    vip_type: string
    vip_icon: string
    medal_info: {
      type_id: number
      medal_id: number
      medal_level: number
      medal_name: string
      medal_desc: string
      night_url: string
      daytime_url: string
    }
    vip_type_new: string
    suid: string
    liveInfo: {
      roomID: string
      roomStatus: string
    }
    cpLevel: number
  }
  chlmrk: string
  chlsicon: string
  media_id: string
  chlname: string
  source: string
  chlicon: string
  qualityScore: string
  uinnick: string
  uinname: string
  tag: string[]
  commentGifSwitch: number
  forbidCommentUpDown: number
  forbidExpr: number
  emojiRelatedSwitch: number
  emojiSwitch: number
  openAds: number
  openAdsText: number
  openRelatedNewsAd: number
  openAdsComment: number
  show_expr: number
  showType_video: string
  picShowType: number
  newsModule: {}
  labelList: [
    {
      color: string
      nightColor: string
      textColor: string
      textNightColor: string
      word: string
      type: number
      typeName: string
    }
  ]
  readCount: number
  shareUrl: string
  likeInfo: number
  gifRelatedSwitch: number
  commentSyncWeibo: number
  textShareType: string
  enableDiffusion: number
  NewsSource: string
  hotEvent: {
    id: string
    ranking: number
    title: string
    hotScore: number
    is_top: number
  }
  ranking: 1
  pubInfo: {
    source: string
    sub_source: string
  }
  fimgUrl: {}
  nlpAbstract: string
  nlpContentAbstract: string
}
//#endregion
interface NewListItem {
  has_more: 0 | 1
  ids_hash: string
  newslist: NewsItem[]
}

export interface TencentNewsResponse {
  ret: 0
}
export interface TencentNewsHotResponse {
  idlist: NewListItem[]
}
