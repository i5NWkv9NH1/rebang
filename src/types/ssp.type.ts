export interface SspItem {
  id: number
  title: string
  banner: string
  summary: string
  comment_count: number
  like_count: number
  view_count: number
  free: boolean
  post_type: number
  important: number
  released_time: number
  morning_paper_title: any[]
  advertisement_url: ''
  series: any[]
  author: {
    id: 0
    slug: string
    avatar: string
    nickname: string
  }
  corner: {
    id: number
    name: string
    url: string
    icon: string
    memo: string
    color: string
  }
  special_columns: any[]
  status: number
  created_time: number
  modify_time: number
  is_matrix: boolean
  is_recommend_to_home: number
  slug: string
  belong_to_member: number
  issue: string
  tags: any[]
  podcast_duration: number
  article_limit_free: boolean
  article_limit_free_stime: number
  article_limit_free_etime: number
}

export interface SspResponse {
  error: number
  msg: string
  total: number
}

export interface SspPaginationRequestPayload {
  limit: number
  offset: number
  created_at: number
  tag: string
  released: boolean
}
export interface SspPaginationResponse extends SspResponse {
  data: SspItem[]
  total: number
}
