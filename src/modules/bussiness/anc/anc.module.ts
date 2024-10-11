import { Module } from '@nestjs/common'
import { AncService } from './anc.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Anc } from './entities/anc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Anc])],
  providers: [AncService],
  exports: [AncService]
})
export class AncModule {}
