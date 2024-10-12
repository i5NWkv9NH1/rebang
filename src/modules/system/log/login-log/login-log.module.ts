import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoginLogService } from './services/login-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([LoginLogModule])],
  providers: [LoginLogService],
  exports: [LoginLogService]
})
export class LoginLogModule {}
