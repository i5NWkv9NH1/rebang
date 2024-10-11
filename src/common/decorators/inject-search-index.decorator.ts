import { SetMetadata } from '@nestjs/common'

export const SEARCH_INDEX_KEY = 'indexName'
export const InjectSearchIndex = () => SetMetadata(SEARCH_INDEX_KEY, true)
