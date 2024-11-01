import { Module } from '@nestjs/common'
import { BusinessModule } from '../bussiness/business.module'
import { AdminAdController } from './admin/admin-ad.controller'
import { AdminAncController } from './admin/admin-anc.controller'
import { AdminCategoryController } from './admin/admin-category.controller'
import { WebHomeController } from './web/web-home.controller'
import { AdminTrackerController } from './admin/admin-tracker.controller'
import { AdminUserController } from './admin/admin-user.controller'
import { AdminWebsiteController } from './admin/admin-website.controller'
import { AdminAuthController } from './admin/admin-auth.controller'
import { RbacModule } from '../rbac/rbac.module'
import { SystemModule } from '../system/system.module'
import { AdminAccountController } from './admin/admin-account.controller'
import { AdminRoleContoller } from './admin/admin-role.controller'
import { AdminResourceController } from './admin/admin-resource.controller'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { RolesGuard } from 'src/shared/guards/roles.guard'

@Module({
  imports: [BusinessModule, RbacModule, SystemModule],
  controllers: [
    //* admin
    AdminAdController,
    AdminAncController,
    AdminAuthController,
    AdminAccountController,
    AdminRoleContoller,
    AdminResourceController,
    AdminCategoryController,
    AdminTrackerController,
    AdminUserController,
    AdminWebsiteController,
    //* ssr web
    WebHomeController
    //* h5
  ]
})
export class EndpointModule {}
