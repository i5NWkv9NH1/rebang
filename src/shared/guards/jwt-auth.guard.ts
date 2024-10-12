import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from 'src/common/decorators/pubic.decorator'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  protected readonly logger = new Logger(JwtAuthGuard.name)

  constructor(
    //* 用于生成和验证 JWT
    /**
     * * sign(payload: any, options?: SignOptions): 生成 JWT，通常包含用户的 ID、角色等信息。
     * * verify(token: string, options?: VerifyOptions): 验证 JWT 的有效性，确保它未过期且未被篡改。
     */
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization

    if (!authorization) {
      throw new UnauthorizedException('No token provide')
    }

    try {
      const token = authorization.split(' ')[1]
      const payload = await this.jwtService.verifyAsync(token)
      // TODO: 将信息插入到请求上下文
      // TODO: 提供给其他 Guard 使用
      this.logger.debug('Payload', payload)
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token' + '\n' + error)
    }
  }
}
