import { CommonItem } from 'src/shared/type'

export interface OriginAcFunRankItem {
  contentId: number
  title: string
  userName: string
  description: string
  dougaId: string
  coverUrl: string
  videoCover: string
  viewCountShow: string
  viewCount: number
  likeCount: number
  commentCount: number
  channelName: string
  contentDesc: string
  stowCount: number
  duration: number
  userImg: string
  tagList: { name: string; id: string }[]
  userId: number
  contributeTime: number
  createTimeMillis: number
  danmakuCount: number
  danmuCount: number
  durationMillis: number
  user: {
    id: string
    name: string
    headUrl: string
    followingCountValue: number
    fanCountValue: number
    contributeCountValue: number
  }
}

export interface OriginAcFunRankRequestPayload {
  channelId?: string | number
  subChannelId?: string | number
  rankLimit: 30
  rankPeriod: 'DAY' | 'THREE_DAYS' | 'WEEK'
}

export interface OriginAcFunRankResponse {
  'host-name': string
  requestId: string
  result: number
  rankList: OriginAcFunRankItem[]
}

export interface AcFunItem extends CommonItem {
  duration: number
  user: {
    id?: string | number
    name: string
    avatarUrl?: string
    stats: {
      following: number
      fanCount: number
      contribute: number
    }
  }
  stats: {
    view: number
    like: number
    comment: number
    collect: number
    danmu: number
  }
  tags: { id: string; name: string }[]
}
export interface AcFunResponse {}
