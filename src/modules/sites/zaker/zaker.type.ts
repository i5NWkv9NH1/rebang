export interface OriginZakerItem {
  url: string
  icon_url: string
  tag_name: string
  date: string
  desc: string
  author_name: string
  auther_name: string
  thumbnail_mpic: string
  comment_counts: number
  author_url: string
  tag: {
    is_flock: string
    tag: string
    total: number
    url: string
  }[]
  title: string
}

export interface OriginZakerResponse {}
export interface OriginZakerHotResponse extends OriginZakerResponse {
  data: {
    article: OriginZakerItem[]
  }
  next_url: {
    value: string
  }
}
