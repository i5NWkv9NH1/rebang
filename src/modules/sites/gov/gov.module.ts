import { Module } from '@nestjs/common'
import { ChinaModule } from './china/china.module'
import { NbsModule } from './nbs/nbs.module'
import { QstheoryModule } from './qstheory/qstheory.module'
import { CcdiModule } from './ccdi/ccdi.module'
import { PiyaoModule } from './piyao/piyao.module'
import { CeaModule } from './cea/cea.module'
import { MoeModule } from './moe/moe.module'
import { DswxyjyModule } from './dswxyjy/dswxyjy.module'
import { GuangdongModule } from './guangdong/guangdong.module';

@Module({
  imports: [
    ChinaModule,
    NbsModule,
    QstheoryModule,
    CcdiModule,
    PiyaoModule,
    CeaModule,
    MoeModule,
    DswxyjyModule,
    GuangdongModule
  ]
})
export class GovModule {}
