import { Module } from '@nestjs/common'
import { ShareModule } from './shared/shared.module'
import { BusinessModule } from './modules/bussiness/business.module'

@Module({
  imports: [ShareModule, BusinessModule]
})
export class AppModule {}
