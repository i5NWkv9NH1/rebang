import { Controller, Get } from '@nestjs/common'
import { _360Service } from './_360.service'

@Controller('sites/360')
export class _360Controller {
  constructor(private readonly _360service: _360Service) {}

  @Get('rank')
  public async rank() {
    return await this._360service.fetchRank()
  }
}
