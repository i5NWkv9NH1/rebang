import { Module } from '@nestjs/common'
import { ZhihuModule } from '../../crawer/zhihu/zhihu.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Website } from './entities/website.entity'
import { Part } from './entities/part.entity'
import { PartScraped } from './entities/part-scraped.entity'
import { PartConfig } from './entities/part-config.entity'
import { WebsiteService } from './services/website.service'
import { PartService } from './services/part.service'
import { PartConfigService } from './services/part-config.service'
import { PartScrapedService } from './services/part-scraped.service'
import { WebsiteContoller } from './website.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Website, Part, PartConfig, PartScraped])],
  controllers: [WebsiteContoller],
  providers: [
    WebsiteService,
    PartService,
    PartConfigService,
    PartScrapedService
  ],
  exports: [WebsiteService, PartService, PartConfigService, PartScrapedService]
})
export class WebsiteModule {}
