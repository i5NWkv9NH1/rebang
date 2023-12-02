import { Module } from '@nestjs/common'
import { WereadService } from './weread.service'
import { WereadController } from './weread.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WereadEntity } from './weread.entity'
import { WereadTask } from './weread.task'

@Module({
  imports: [TypeOrmModule.forFeature([WereadEntity])],
  providers: [WereadService, WereadTask],
  exports: [WereadService, WereadTask],
  controllers: [WereadController]
})
export class WereadModule {}
