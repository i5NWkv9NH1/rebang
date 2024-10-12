import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { PermissionModule } from './permission/permission.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [AccountModule, PermissionModule, RoleModule],
  exports: [AccountModule, PermissionModule, RoleModule]
})
export class RbacModule {}
