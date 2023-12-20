import { Controller, Get, Query } from '@nestjs/common'
import { ShadiaonewsService } from './shadiaonews.service'

@Controller('sites/shadiaonews')
export class ShadiaonewsController {
  constructor(private readonly shadiaonewsService: ShadiaonewsService) {}

  @Get()
  public async start(@Query('page') page: number = 0) {
    return await this.shadiaonewsService.start(page)
  }
}
