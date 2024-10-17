import {
  BadRequestException,
  Body,
  Logger,
  Post,
  UseGuards
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { AccountSerivce } from 'src/modules/rbac/account/services/account.service'
import { AdminAuthSigninDto, AdminAuthSignupDto } from './dto/admin-auth-dto'
import { ConfigService } from '@nestjs/config'
import { compare } from 'bcrypt'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { Public } from 'src/common/decorators/pubic.decorator'

@UseGuards(JwtAuthGuard)
@UseAdminController('auth', ['1'])
export class AdminAuthController {
  protected readonly logger = new Logger(AdminAuthController.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountSerivce,
    private readonly configService: ConfigService
  ) {}

  @Public()
  @Post('signin')
  async signin(@Body() dto: AdminAuthSigninDto) {
    const entity = await this.accountService.findOneByUsername(dto.username)
    if (!entity) {
      throw new BadRequestException('Account not found')
    }
    const diff = await compare(dto.password, entity.password)

    if (!diff) {
      throw new BadRequestException('Password incorrect')
    }

    const payload = { account: entity, sub: entity.id }

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '1h'

    return {
      tokens: {
        accessToken: this.generatorToken(payload, expiresIn)
      },
      account: entity
    }
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: AdminAuthSignupDto) {
    const entity = await this.accountService.findOneByUsername(dto.username)
    if (entity) {
      throw new BadRequestException('Account exist')
    }
    return await this.accountService.create(dto)
  }

  private generatorToken(payload: any, expiresIn: string) {
    return this.jwtService.sign(payload, { expiresIn })
  }
}
