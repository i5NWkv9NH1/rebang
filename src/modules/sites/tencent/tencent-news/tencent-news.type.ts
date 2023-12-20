export interface OriginTencentAnswerItem {
  question_id: string
  follow_num: number
  already_answer: boolean
  title: string
  url: string
  relation_status: boolean
}
export interface OriginTencentQuestionItem {
  title: string
  tag_id: number
  cms_id: string
  image: string
  answer_name: string
  answer_tag: string
  hot_image: string
  hot_image_night: string
  main_points: string
  url: string
  head_url: string
  approve_num: number
}
export interface OriginTencentRankItem {
  id: '20231219A00W1T00'
  a_ver: '00'
  articletype: string
  title: '习近平对甘肃临夏州积石山县6.2级地震作出重要指示'
  chlid: '5116944'
  commentid: '8237690142'
  longtitle: '习近平对甘肃临夏州积石山县6.2级地震作出重要指示'
  surl: 'https://view.inews.qq.com/a/20231219A00W1T00'
  short_url: 'https://view.inews.qq.com/a/20231219A00W1T00'
  url: 'https://view.inews.qq.com/a/20231219A00W1T00'
  time: '2023-12-19 07:37:21'
  timestamp: 1702942641
  abstract: '习近平对甘肃临夏州积石山县6.2级地震作出重要指示 要求全力开展搜救 妥善安置受灾群众 尽最大努力保障人民群众生命财产安全 李强作出批示 新华社北京12月19日电  北京时间12月18日23时59分，甘肃临夏州积石山县发生6.2级地震，震源深度10公里。截至目前，地震已造成甘肃100人死亡、青海11人死亡，部分水、电、交通、通讯...'
  disableDelete: 1
  comments: 1125
  alg_version: 1
  thumbnails?: string
  card: {
    chlid: '5116944'
    chlname: '新华网'
    desc: '引领品质阅读，让新闻离你更近'
    icon: 'http://inews.gtimg.com/newsapp_ls/0/14516369376_200200/0'
    sicon: 'http://inews.gtimg.com/newsapp_ls/0/14516369376_200200/0'
    uin: 'ec3b25d62774165edd8446efa3bd6a48d9'
    update_frequency: '1702993052'
    vip_desc: '新华网官方账号'
    vip_icon_night: 'http://inews.gtimg.com/newsapp_ls/0/14876049528/0'
    vip_place: 'left'
    vip_type: string

    vip_icon: 'http://inews.gtimg.com/newsapp_ls/0/14876049251/0'
    medal_info: {
      type_id: 31
      medal_id: 45
      medal_level: 1
      medal_name: '别具慧眼'
      medal_desc: '成为荐评手，一起建设腾讯新闻社区！'
      night_url: 'https://new.inews.gtimg.com/tnews/8c3d00f9/7f36/8c3d00f9-7f36-44a9-82c4-be357b54fe9b.png'
      daytime_url: 'https://new.inews.gtimg.com/tnews/45af77fe/a73d/45af77fe-a73d-42d2-ab80-feaa383611de.png'
    }
    vip_type_new: '30013'
    suid: '8QMa13hY5YcbvTk='
    liveInfo: {
      roomID: '1399350461'
      roomStatus: '2'
    }
    cpLevel: 1
  }
  chlmrk: '引领品质阅读，让新闻离你更近'
  chlsicon: 'http://inews.gtimg.com/newsapp_ls/0/14516369376_200200/0'
  media_id: '5116944'
  chlname: '新华网'
  source: '新华网'
  chlicon: 'http://inews.gtimg.com/newsapp_ls/0/14516369376_200200/0'
  qualityScore: '3'
  uinnick: '新华网'
  uinname: '5116944'
  tag: string[]
  commentGifSwitch: 1
  forbidCommentUpDown: 1
  forbidExpr: 1
  emojiRelatedSwitch: 1
  emojiSwitch: 1
  openAds: 1
  openAdsText: 1
  openRelatedNewsAd: 1
  openAdsComment: 1
  show_expr: 1
  showType_video: 'normal'
  picShowType: 126
  newsModule: {}
  labelList: {
    color: string
    nightColor: string
    textColor: string
    textNightColor: string
    word: string
    type: number
    typeName: string
  }[]
  readCount: number
  shareUrl: string
  likeInfo: number
  closeAllAd: number
  commentNum: number
  gifRelatedSwitch: number
  commentSyncWeibo: number
  textShareType: '1'
  shareDoc: {
    shareDataToFriend: {
      shareTitle: string
      shareSubTitle: string
      shareImg: string
    }
    shareDataToCircle: {
      shareTitle: string
      shareSubTitle: string
      shareImg: string
    }
    shareDataToQQFriend: {
      shareTitle: string
      shareSubTitle: string
      shareImg: string
    }
    shareDataToQZone: {
      shareTitle: string
      shareSubTitle: string
      shareImg: string
    }
    shareDataToWeibo: {
      shareTitle: string
      shareSubTitle: string
      shareImg: string
    }
  }
  enableDiffusion: 1
  tlTitle: string
  NewsSource: string
  disableInsert: string
  hotEvent: {
    id: string
    ranking: 1
    title: '习近平对甘肃6.2级地震作出指示'
    hotScore: 546405
    is_top: 1
  }
  ranking: 1
  pubInfo: {
    source: '2'
    sub_source: '0'
  }
  fimgUrl: {}
  nlpAbstract: string
  nlpContentAbstract: string
  extra_property: {}
  userAddress: string
  hippyTransMap: {
    is_top: 1
  }
}

export interface OriginTencentNewsResponse {
  code: number
  message: string
}
export interface OriginTencentNewsQuestionResponse
  extends OriginTencentNewsResponse {
  data: {
    answer: OriginTencentAnswerItem[]
    hot_questions: OriginTencentQuestionItem[]
  }
}

export interface OriginTencentNewsRankResponse {
  idlist: {
    has_more: number
    ids_hash: string
    newslist: OriginTencentRankItem[]
  }[]
}
