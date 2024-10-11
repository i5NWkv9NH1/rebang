import { Module } from '@nestjs/common'
import { ShareModule } from './shared/shared.module'
import { BusinessModule } from './modules/bussiness/business.module'
import { AncModule } from './modules/bussiness/anc/anc.module'
import { TrackerModule } from './modules/bussiness/tracker/tracker.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [ShareModule, CoreModule, BusinessModule]
})
export class AppModule {}
