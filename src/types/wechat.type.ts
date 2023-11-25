export interface WereadItem {
  hints: string
  readingCount: number
  searchCount: number
  type: number
  bestMark: string
  riseCount: number
  searchIdx: number
  bookInfo: {
    authorVids: string
    isEPUBComics: number
    newRatingCount: number
    intro: string
    extra_type: number
    categories: {
      categoryId: number
      subCategoryId: number
      categoryType: number
      title: string
    }[]
    paperBook: {
      skuId: ''
    }
    bookStatus: number
    finished: number
    hasLecture: number
    language: string
    bookId: string
    format: string
    free: number
    blockSaveImg: number
    title: string
    maxFreeChapter: number
    mcardDiscount: number
    centPrice: number
    cpid: number
    hideUpdateTime: boolean
    newRating: number
    newRatingDetail: {
      title: string
    }
    payType: number
    cover: string
    version: number
    type: number
    ispub: number
    publishTime: string
    category: string
    lastChapterIdx: number
    author: string
    originalPrice: number
    soldout: number
    price: number
  }
}
export interface WeReadResponse {
  hasMore: 0 | 1
  synckey: number
  totalCount: number
  uiInfo: {
    styleType: string
  }
  books: WereadItem[]
}
