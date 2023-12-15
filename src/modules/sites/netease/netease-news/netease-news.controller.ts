import { Controller, Get } from '@nestjs/common'
import { NeteaseNewsService } from './netease-news.service'

@Controller('sites/netease/news')
export class NeteaseNewsController {
  constructor(private readonly neteaseNewsService: NeteaseNewsService) {}

  @Get('comment')
  async comment() {
    return await this.neteaseNewsService.comment()
  }
  @Get('rank')
  async rank() {
    return await this.neteaseNewsService.rank()
  }
  @Get('search')
  async search() {
    return await this.neteaseNewsService.search()
  }
  @Get('video')
  async video() {
    return await this.neteaseNewsService.video()
  }
  @Get('topic')
  async topic() {
    return await this.neteaseNewsService.topic()
  }
}
