import { Controller, Get } from '@nestjs/common'
import { SspService } from './ssp.service'

@Controller('sites/ssp')
export class SspController {
  constructor(private readonly sspService: SspService) {}

  @Get('hot')
  public async sspHot() {
    return await this.sspService.hot()
  }
  @Get('recomment')
  public async recomment() {
    return await this.sspService.recomment()
  }
}
