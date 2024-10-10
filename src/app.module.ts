import { Module } from '@nestjs/common'
import { ShareModule } from './shared/shared.module'
import { BusinessModule } from './modules/bussiness/business.module'
import { AncModule } from './modules/bussiness/anc/anc.module'

@Module({
  imports: [ShareModule, BusinessModule]
})
export class AppModule {}
