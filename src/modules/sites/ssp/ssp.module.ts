import { Module } from '@nestjs/common'
import { SspService } from './ssp.service'
import { SspController } from './ssp.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SspEntity } from './ssp.entity'
import { SspTask } from './ssp.task'

@Module({
  imports: [TypeOrmModule.forFeature([SspEntity])],
  providers: [SspService, SspTask],
  exports: [SspService, SspTask],
  controllers: [SspController]
})
export class SspModule {}
