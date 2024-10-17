import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { ResourceModule } from './resource/resource.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [AccountModule, ResourceModule, RoleModule],
  exports: [AccountModule, ResourceModule, RoleModule]
})
export class RbacModule {}
