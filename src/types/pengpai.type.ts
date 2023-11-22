export interface Item {
  contId: string
  isOutForword: string
  isOutForward: string
  forwardType: string
  mobForwardType: number
  interactionNum: string
  praiseTimes: string
  pic: string
  imgCardMode: number
  smallPic: string
  sharePic: string
  pubTime: string
  pubTimeNew: string
  name: string
  closePraise: string
  nodeInfo: {
    nodeId: null
    name: string
    desc: string
    pic: string
    nodeType: number
    channelType: number
    forwordType: number
    forwardType: string
    liveType: string
    parentId: number
    isOrder: string
    dataType: string
    shareName: string
    nickName: string
    publishTime: number
    mobForwardType: string
    summarize: string
    color: string
    videoLivingRoomDes: string
    wwwSpecNodeAlign: 0
    govAffairsType: string
  }
  nodeId: number
  contType: number
  pubTimeLong: number
  specialNodeId: number
  cardMode: string
  dataObjId: number
  closeFrontComment: boolean
  isSupInteraction: boolean
  tagList: {
    tagId: number
    tag: string
    isOrder: string
  }[]
  hideVideoFlag: boolean
  praiseStyle: number
  isSustainedFly: number
  softLocType: number
  closeComment: boolean
  voiceInfo: {
    imgSrc: string
    isHaveVoice: string
  }
}
//! common response
export interface PengpaiResponse {
  code: number
  desc: string
  time: number
}
//! pagination response
//? pagination default data
export interface PengpaiDefaultResponseData extends PengpaiResponse {
  data: {
    hasNext: boolean
    startTime: number
    list: Item[]
    nodeInfo: null | unknown
    tagInfo: null | unknown
    moreNodeInfo: null | unknown
    pageNum: number | null
    pageSize: number | null
    pages: number | null
    total: number | null
    prevPageNum: number | null
    nextPageNum: number | null
    excludeContIds: number[] | null
    filterIds: number[] | unknown
    contCont: null | unknown
  }
}
export interface PengpaiContentResponse extends PengpaiDefaultResponseData {}
export interface PengpaiChannelResponse extends PengpaiDefaultResponseData {}
export interface PengpaiNodeResponse extends PengpaiDefaultResponseData {}

//! hot
export interface PengpaiHotRespones extends PengpaiResponse {
  data: Item[]
}

//! pagination request payload
export interface PengpaiRequestPayload {
  excludeContIds: number[]
  listRecommendIds: number[]
  pageNum: number
  pageSize: number
  startTime: number
}
export interface PengpaiContentRequestPayload extends PengpaiRequestPayload {
  channelId: string
  contCount?: number
  province?: string
  userId?: string
  noImgRecommend?: boolean
  waterfallSpecialIndex?: number
}
export interface PengpaiChannelRequestPayload extends PengpaiRequestPayload {
  channelId: string
}
export interface PengpaiNodeRequestPayload extends PengpaiRequestPayload {
  nodeId: string
}
