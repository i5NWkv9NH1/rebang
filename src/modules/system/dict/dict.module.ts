import { Module } from '@nestjs/common'
import { RbacModule } from '../../rbac/rbac.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dict } from './entities/dict.entity'
import { DictItem } from './entities/dict-detail.entity'
import { DictService } from './services/dict.service'

@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictItem]), RbacModule],
  providers: [DictService],
  exports: [DictService]
})
export class DictModule {}
