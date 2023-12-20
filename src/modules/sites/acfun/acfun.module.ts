import { Module } from '@nestjs/common'
import { AcFunService } from './acfun.service'
import { AcfunController } from './acfun.controller'
import { AcFunTask } from './acfun.task'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcFunEntity } from './acfun.entity'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  // imports: [TypeOrmModule.forFeature([AcFunEntity]), SharedModule],
  providers: [AcFunService, AcFunTask],
  exports: [AcFunService, AcFunTask],
  controllers: [AcfunController]
})
export class AcfunModule {}
