import { Injectable, Logger } from '@nestjs/common'
import MeiliSearch from 'meilisearch'
import { InjectMeiliSearch } from 'nestjs-meilisearch'

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(SearchService.name)
  private indexName: string

  constructor(
    @InjectMeiliSearch()
    private readonly client: MeiliSearch
  ) {}

  async setIndex(indexName: string, ...args) {
    const [searchableAttributes, filterableAttributes] = args
    this.createIndex(indexName, searchableAttributes, filterableAttributes)
  }

  async updateIndex() {
    return await this.client.index(this.indexName).updateSettings({
      searchableAttributes: ['title']
    })
  }

  async createIndex(
    indexName: string,
    searchableAttributes?: string[],
    filterableAttributes?: string[]
  ) {
    this.indexName = indexName
    const saved = await this.client.createIndex(this.indexName, {
      primaryKey: 'id'
    })
    if (searchableAttributes) {
      await this.client.index(this.indexName).updateSettings({
        searchableAttributes
      })
    }
    // if (filterableAttributes) {
    //   await this._index.updateSettings({
    //     filterableAttributes
    //   })
    // }
    return saved
  }

  async search(query: string) {
    return await this.client.index(this.indexName).search(query)
  }

  async addDocuments(documents: any[]) {
    return await this.client.index(this.indexName).addDocuments(documents)
  }

  async updateDocuments(documents: any[]) {
    return await this.client.index(this.indexName).updateDocuments(documents)
  }

  async deleteDocuments(documentIds: string[]) {
    return await this.client.index(this.indexName).deleteDocuments(documentIds)
  }

  async getDocument(documentId: string) {
    return await this.client.index(this.indexName).getDocument(documentId)
  }

  async getDocuments() {
    return await this.client.index(this.indexName).getDocuments()
  }

  async deleteIndex() {
    return await this.client.index(this.indexName).delete()
  }
}
