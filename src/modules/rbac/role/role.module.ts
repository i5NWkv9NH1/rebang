import { Module } from '@nestjs/common'
import { RoleService } from './services/role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { AccountModule } from '../account/account.module'
import { ResourceModule } from '../resource/resource.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AccountModule, ResourceModule],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
