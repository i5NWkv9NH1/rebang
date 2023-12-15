import { Controller, Get } from '@nestjs/common'
import { SogouService } from './sogou.service'

@Controller('sites/sogou')
export class SogouController {
  constructor(private readonly sogouService: SogouService) {}

  @Get('hot')
  public async hot() {
    return await this.sogouService.hot()
  }
}
