import { Injectable, Logger } from '@nestjs/common'
import MeiliSearch, {
  DocumentOptions,
  DocumentsQuery,
  Settings,
  TasksQuery
} from 'meilisearch'
import { InjectMeiliSearch } from 'nestjs-meilisearch'

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(SearchService.name)
  protected indexName: string

  constructor(
    @InjectMeiliSearch()
    private readonly client: MeiliSearch
  ) {}

  public async getIndex(index: string) {
    return await this.client.getIndex(index)
  }

  async updateIndex(index: string, settings: Settings) {
    return await this.client.index(index).updateSettings(settings)
  }

  async createIndex(index: string, primaryKey = 'id') {
    return await this.client.createIndex(index, {
      primaryKey
    })
  }

  async search(index: string, query: string) {
    return await this.client.index(index).search(query)
  }

  async addDocuments(
    index: string,
    documents: any[],
    options?: DocumentOptions
  ) {
    return await this.client.index(index).addDocuments(documents, options)
  }

  async updateDocuments(
    index: string,
    documents: any[],
    options?: DocumentOptions
  ) {
    return await this.client.index(index).updateDocuments(documents, options)
  }

  async deleteDocuments(index: string, documentIds: string[]) {
    return await this.client.index(index).deleteDocuments(documentIds)
  }

  async getDocument(index: string, documentId: string) {
    return await this.client.index(index).getDocument(documentId)
  }

  async getDocuments<T extends Record<string, any>>(
    index: string,
    parameters: DocumentsQuery<T> = {}
  ) {
    return await this.client.index(index).getDocuments(parameters)
  }

  async deleteIndex(index: string) {
    return await this.client.index(index).delete()
  }

  async getTasks(index: string, query: TasksQuery = {}) {
    return await this.client.index(index).getTasks(query)
  }
  async findTask(index: string, uid: number) {
    return await this.client.index(index).getTask(uid)
  }
}
