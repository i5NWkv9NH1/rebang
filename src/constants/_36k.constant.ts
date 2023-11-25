import { Tag } from 'src/types'

export const _36KCronLatest = '' as const
export const _36kCronToday = '' as const
export const _36KCronRankHot = '' as const
export const _36KCronRankVideo = '' as const
export const _36KCronRankComment = '' as const
export const _36KCronRankCollect = '' as const

export const _36KRouteLates = '/36k/latest'
export const _36KRouteToday = '/36k/today'
export const _36KRouteRankHot = '/36k/rank/hot'
export const _36KRouteRankVideo = '/36k/rank/video'
export const _36KRouteRankComment = '/36k/rank/comment'
export const _36KRouteRankCollect = '/36k/rank/collect'

export const _36kTags: Tag[] = [
  { path: _36KRouteLates, name: '最新资讯' },
  { path: _36KRouteToday, name: '快讯' },
  { path: _36KRouteRankVideo, name: '榜单/热榜' },
  { path: _36KRouteRankVideo, name: '榜单/视频' },
  { path: _36KRouteRankComment, name: '榜单/评论' },
  { path: _36KRouteRankCollect, name: '榜单/收藏' }
]
