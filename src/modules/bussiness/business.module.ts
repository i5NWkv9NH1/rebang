import { Module } from '@nestjs/common'
import { WebsiteModule } from './website/website.module'
import { CategoryModule } from './category/category.module'
import { ZhihuModule } from './website/zhihu/zhihu.module'
import { AdModule } from './ad/ad.module'
import { AncModule } from './anc/anc.module'

@Module({
  imports: [WebsiteModule, CategoryModule, ZhihuModule, AdModule, AncModule]
})
export class BusinessModule {}
