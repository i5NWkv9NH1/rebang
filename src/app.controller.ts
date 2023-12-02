import { Controller, Get, Query, Render } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('query')
  async query(@Query('q') q?: string) {
    return await this.appService.get(q)
  }
  @Get('del')
  async del(@Query('q') q?: string) {
    return await this.appService.del(q)
  }
}
