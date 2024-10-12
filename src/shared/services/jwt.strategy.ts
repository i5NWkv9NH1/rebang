/**
 * * @description 提取和验证 JWT 的策略。
 */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { BaseEntity } from 'typeorm'

interface ProviderService<T = any> {
  fineOne(id: string): Promise<T>
}

@Injectable()
export class JwtStrategy<E extends AbstractBaseEntity> extends PassportStrategy(
  Strategy
) {
  protected logger = new Logger(JwtStrategy.name)

  constructor(
    protected readonly configService: ConfigService,
    protected readonly provider: ProviderService<E>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }

  //* 该方法接收解码后的 JWT payload，通常用于从数据库中查询用户信息并返回。
  //* 返回的用户信息会被注入到请求上下文中，供后续的控制器或守卫使用。
  async validate(payload) {
    this.logger.warn(this.validate.name, payload)
    // const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload)
    return await this.provider.fineOne(payload.sub)
    // if (await this.blacklistedTokensService.isTokenBlacklisted(token)) {
    //   throw new UnauthorizedException('Token has been blacklisted')
    // }
    // const account = await this.accountService.findOne(payload.sub)

    // if (!account) {
    //   throw new UnauthorizedException('Account not found')
    // }
    return
  }
}
