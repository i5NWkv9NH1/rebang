import { Module } from '@nestjs/common'
import { RoleService } from './services/role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { PermissionModule } from '../permission/permission.module'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AccountModule, PermissionModule],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
