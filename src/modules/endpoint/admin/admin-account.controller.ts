import { Body, Logger, Param, Patch } from '@nestjs/common'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { AccountSerivce } from 'src/modules/rbac/account/services/account.service'
import { AdminAccountUpdatePasswordDto } from './dto/admin-account.dot'
import {
  CreateAccountDto,
  UpdateAccountDto
} from 'src/modules/rbac/account/dto/create-account.dto'
import {
  BaseCrudController,
  IdParamsDto
} from 'src/common/abstracts/base-crud-controller.abstract'
import { Account } from 'src/modules/rbac/account/entities/account.entity'

@UseAdminController('accounts', ['1', '2'])
export class AdminAccountController extends BaseCrudController<
  Account,
  CreateAccountDto,
  UpdateAccountDto
> {
  protected readonly logger = new Logger(AdminAccountController.name)

  constructor(private readonly accountService: AccountSerivce) {
    super(accountService)
  }

  @Patch(':id/password')
  async updatePassword(
    @Param() params: IdParamsDto,
    @Body() dto: AdminAccountUpdatePasswordDto
  ) {
    const { id } = params
    return await this.accountService.updatePassword(id, dto)
  }
}
