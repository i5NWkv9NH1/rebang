import { Module } from '@nestjs/common'
import { AccountSerivce } from './services/account.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountSerivce, JwtAuthGuard],
  exports: [AccountSerivce]
})
export class AccountModule {}
