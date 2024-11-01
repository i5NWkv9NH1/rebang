import { Module } from '@nestjs/common'
import { ShareModule } from './shared/shared.module'
import { BusinessModule } from './modules/bussiness/business.module'
import { CrawerModule } from './modules/crawer/crawer.module'
import { EndpointModule } from './modules/endpoint/endpoint.module'
import { SystemModule } from './modules/system/system.module'
import { RbacModule } from './modules/rbac/rbac.module'

@Module({
  imports: [
    //* 共享模块，如 redis
    ShareModule,
    //* 业务模块
    BusinessModule,
    //* 爬虫模块
    // CrawerModule,
    //* API 接口
    EndpointModule,
    //* 权限
    RbacModule,
    //* 系统模块，如 RBAC，日志
    SystemModule
  ]
})
export class AppModule {}
