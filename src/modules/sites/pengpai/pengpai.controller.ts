import { Controller, Get, Param } from '@nestjs/common'
import { PengpaiService } from './pengpai.service'
import { PengpaiChannelDto, PengpaiNodeDto } from './pengpai.dto'

@Controller('sites/pengpai')
export class PengpaiController {
  constructor(private readonly pengpaiService: PengpaiService) {}

  @Get('hot')
  public async hot() {
    return await this.pengpaiService.hot()
  }

  @Get('channel/:id')
  public async channel(@Param('id') id: string) {
    const dto = new PengpaiChannelDto(id)
    return await this.pengpaiService.findByChannel(dto)
  }

  @Get('node/:id')
  public async node(@Param('id') id: string) {
    const dto = new PengpaiNodeDto(id)
    return await this.pengpaiService.findByNode(dto)
  }
}
