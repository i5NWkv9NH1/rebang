import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { JuejinService } from './juejin.service'
import {
  JUEJIN_ARTICLE_TYPE,
  JUEJIN_ARTICLE_CATEGORY,
  JUEJIN_AUTHOR_TYPE,
  JUEJIN_AUTHOR_CATEGORY
} from './juejin.constant'
import { RedisCachingInterceptor } from 'src/shared/redis-caching-interceptor'

//TODO: dynamic redis key
@Controller('sites/juejin')
@UseInterceptors(RedisCachingInterceptor)
export class JuejinController {
  constructor(private readonly juejinService: JuejinService) {}

  @Get('article')
  public async article(
    @Query('type') type: JUEJIN_ARTICLE_TYPE,
    @Query('categoryId') categoryId: JUEJIN_ARTICLE_CATEGORY
  ) {
    return await this.juejinService.article(type, categoryId)
  }

  @Get('column')
  async column() {
    return await this.juejinService.column()
  }

  @Get('rec-collect')
  async recCollect() {
    return await this.juejinService.recCollect()
  }

  @Get('author')
  async author(
    @Query('type') type: JUEJIN_AUTHOR_TYPE = JUEJIN_AUTHOR_TYPE.WEEK,
    @Query('categoryId')
    categoryId: JUEJIN_AUTHOR_CATEGORY = JUEJIN_AUTHOR_CATEGORY.BE
  ) {
    console.log(type)
    console.log(categoryId)
    return await this.juejinService.author(type, categoryId)
  }
}
