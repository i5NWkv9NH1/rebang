import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { HttpContext } from 'src/@types/http-context'
import { AccountSerivce } from 'src/modules/rbac/account/services/account.service'

@Injectable()
export class RolesGuard implements CanActivate {
  protected readonly logger = new Logger(RolesGuard.name)

  constructor(
    private readonly reflector: Reflector,
    private readonly accountService: AccountSerivce
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )
    this.logger.debug(isPublic)
    if (isPublic) {
      return true
    }

    const requiredActions = this.reflector.get<string[]>(
      'actions',
      context.getHandler()
    )

    if (!requiredActions) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request<HttpContext>>()
    //* 需要在 jwt 后在 HTTP 上下文传入 account
    //* 查询 account 拥有角色的权限
    // const allowedActions = []
    //* 判断权限中是否含有 API 的权限
    // const hasPermission = []

    return true
  }
}
