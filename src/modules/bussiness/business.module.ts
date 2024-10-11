import { Module } from '@nestjs/common'
import { WebsiteModule } from './website/website.module'
import { CategoryModule } from './category/category.module'
import { AdModule } from './ad/ad.module'
import { AncModule } from './anc/anc.module'
import { CrawerModule } from './crawer/crawer.module'

@Module({
  imports: [WebsiteModule, CategoryModule, AdModule, AncModule, CrawerModule]
})
export class BusinessModule {}
