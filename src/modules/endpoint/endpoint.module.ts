import { Module } from '@nestjs/common'
import { BusinessModule } from '../bussiness/business.module'
import { AdminAdController } from './admin/admin-ad.controller'
import { AdminAncController } from './admin/admin-anc.controller'
import { AdminCategoryController } from './admin/admin-category.controller'
import { WebHomeController } from './web/web-home.controller'
import { AdminTrackerController } from './admin/admin-tracker.controller'

@Module({
  imports: [BusinessModule],
  controllers: [
    //* admin
    AdminAdController,
    AdminAncController,
    AdminCategoryController,
    AdminTrackerController,
    //* ssr web
    WebHomeController
    //* h5
  ]
})
export class EndpointModule {}
