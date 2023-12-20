import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { PengpaiService } from './pengpai.service'
import { PengpaiChannelDto, PengpaiNodeDto } from './pengpai.dto'
import { RedisCachingInterceptor } from 'src/shared/redis-caching-interceptor'

//TODO: dynamic redis key
@Controller('sites/pengpai')
@UseInterceptors(RedisCachingInterceptor)
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
