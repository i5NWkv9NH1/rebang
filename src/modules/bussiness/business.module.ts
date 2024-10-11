import { Module } from '@nestjs/common'
import { WebsiteModule } from './website/website.module'
import { CategoryModule } from './category/category.module'
import { AdModule } from './ad/ad.module'
import { AncModule } from './anc/anc.module'
import { TrackerModule } from './tracker/tracker.module'

@Module({
  imports: [WebsiteModule, CategoryModule, AdModule, AncModule, TrackerModule],
  exports: [WebsiteModule, CategoryModule, AdModule, AncModule, TrackerModule]
})
export class BusinessModule {}
