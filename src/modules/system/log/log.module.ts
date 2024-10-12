import { Module } from '@nestjs/common'
import { ActionLogModule } from './action-log/action-log.module'
import { LoginLogModule } from './login-log/login-log.module'

@Module({
  imports: [ActionLogModule, LoginLogModule]
})
export class LogModule {}
