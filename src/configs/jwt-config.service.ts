import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler'
import {
  JwtModuleAsyncOptions,
  JwtModuleOptions,
  JwtOptionsFactory
} from '@nestjs/jwt'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configServic: ConfigService) {}

  async createJwtOptions() {
    const secret = this.configServic.get<string>('JWT_SECRET')
    if (!secret) throw new NotFoundException('JWT_SECRET not Found')
    const expiresIn = this.configServic.get<string>('JWT_EXPIRES_IN')
    if (!expiresIn) throw new NotFoundException('JWT_EXPIRES_IN not Found')

    return {
      secret,
      signOptions: {
        expiresIn
      }
    }
  }
}
