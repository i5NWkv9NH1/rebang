import { Module } from '@nestjs/common'
import { PermissionService } from './services/permission.service'
import { Permission } from './entities/permission.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
