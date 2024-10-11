import { Module } from '@nestjs/common'
import { ShareModule } from './shared/shared.module'
import { BusinessModule } from './modules/bussiness/business.module'
import { CrawerModule } from './modules/crawer/crawer.module'
import { EndpointModule } from './modules/endpoint/endpoint.module'

@Module({
  imports: [ShareModule, BusinessModule, EndpointModule, CrawerModule]
})
export class AppModule {}
