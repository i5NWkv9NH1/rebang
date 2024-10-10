import { Module } from '@nestjs/common'
import { AncService } from './anc.service'
import { AncController } from './anc.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Anc } from './entities/anc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Anc])],
  controllers: [AncController],
  providers: [AncService]
})
export class AncModule {}
