export interface OriginAcFunRankItem {
  title: string
  userName: string
  description: string
  coverUrl: string
  viewCountShow: string
  commentCount: number
  viewCount: number
  tagList: { name: string; id: string }[]
  user: {
    headUrl: string
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

export interface AcFunResponse {}
