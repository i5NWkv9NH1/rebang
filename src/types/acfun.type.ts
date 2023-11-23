export interface AcfunRankItem {
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

export interface AcfunRankRequestPayload {
  channelId?: string | number
  subChannelId?: string | number
  rankLimit: 30
  rankPeriod: 'DAY' | 'THREE_DAYS' | 'WEEK'
}

export interface AcfunRankResponse {
  'host-name': string
  requestId: string
  result: number
  rankList: AcfunRankItem[]
}
