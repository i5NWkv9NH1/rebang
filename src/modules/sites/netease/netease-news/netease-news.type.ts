import { CommonItem } from 'src/shared/type'

export interface OriginNeteaseNewsCommentItem {
  cmtStr: string
  commentId: string
  docId: string
  doc_image: string
  doc_title: string
  hotScore: number
  hotValue: string
  isOnVoteData: number
  replyCount: number
  score: number
  source: string
  type: string
  user_images: string[]
  videoInfo: {
    length: string
    vid: string
    duration?: string
  }
  voteDetail: any
  wondCmtContent: string
}
export interface OriginNeteaseNewsRankItem {
  type: string
  contentId: string
  title: string
  ptcount: number
  votecount: number
  commentCount: number
  threadVote: number
  hotValue: number
  source: string
  img: string
  imgType: number
  imgUrls: string[]
  ptime: string
  category: string
  click: number
  clickRatio: number
  firstShowedTime: string
  videoInfo?: {
    length: string
    vid: string
    duration?: string
  }
}
export interface OriginNeteaseNewsSearchItem {
  exp: string
  hotWord: string
  rank: number
  searchWord: string
  source: string
}
export interface OriginNeteaseNewsVideoItem {
  type: string
  contentId: string
  title: string
  ptime: string
  hotValue: number
  source: string
  img: string
  videoInfo: {
    length: string
    vid: string
    duration?: string
  }
  videoTopic: {
    tid: string
    ename: string
    tname: string
    alias: string
    topic_icons: string
    certificationImg: string
    certificationText: string
    followed: number
  }
}
export interface OriginNeteaseNewsTopicItem {
  skipID: string
  skipType: string
  topicId: string
  title: string
  keyword: string
  introduction: string
  headPicture: string
  totalJoinCount: number
  url: string
  cursor: number
  heatScore: number
  hotCommentInfo: null
  galaxyExtra: null
}
export interface OriginNeteaseNewsResponse {
  code: number
  message: string
}
export interface OriginNeteaseNewsCommentResponse
  extends OriginNeteaseNewsResponse {
  data: {
    cmtCountMap: any
    cmtDocListUrl: string
    downMoreStr: string
    image: string
    title: string
    upMoreStr: string
    cmtDocs: OriginNeteaseNewsCommentItem[]
  }
}
export interface OriginNeteaseNewsRankResponse
  extends OriginNeteaseNewsResponse {
  data: {
    items: OriginNeteaseNewsRankItem[]
  }
}
export interface OriginNeteaseNewsSearchResponse
  extends OriginNeteaseNewsResponse {
  data: {
    hotRank: OriginNeteaseNewsSearchItem[]
    requestId: string
  }
}
export interface OriginNeteaseNewsVideoResponse
  extends OriginNeteaseNewsResponse {
  data: {
    items: OriginNeteaseNewsVideoItem[]
  }
}
export interface OriginNeteaseNewsTopicResponse
  extends OriginNeteaseNewsResponse {
  data: {
    items: OriginNeteaseNewsTopicItem[]
  }
}

export interface NeteaseNewsCommentItem extends CommonItem {}
