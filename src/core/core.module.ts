import { Module } from '@nestjs/common'
import { ProcessService } from './services/process.service'

@Module({
  providers: [ProcessService]
})
export class CoreModule {}
