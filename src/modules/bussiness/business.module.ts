import { Module } from '@nestjs/common'
import { WebsiteModule } from './website/website.module'
import { CategoryModule } from './category/category.module'
import { ZhihuModule } from './website/zhihu/zhihu.module'

@Module({
  imports: [WebsiteModule, CategoryModule, ZhihuModule]
})
export class BusinessModule {}
