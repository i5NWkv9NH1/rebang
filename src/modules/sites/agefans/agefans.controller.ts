import { Controller, Get, Query } from '@nestjs/common'
import { AgefansService } from './agefans.service'

@Controller('sites/agefans')
export class AgefansController {
  constructor(private readonly agefansService: AgefansService) {}

  @Get('latest')
  async latest(@Query('page') page: number, @Query('size') size: number) {
    return await this.agefansService.latest(page, size)
  }

  @Get('comment')
  async comment(@Query('cid') cid: number, @Query('page') page: number) {
    return await this.agefansService.comment(cid, page)
  }

  @Get('detail')
  async detail(@Query('cid') cid: number) {
    return await this.agefansService.detail(cid)
  }

  @Get('category')
  async category(
    @Query('genre') genre: string,
    @Query('label') label: string,
    @Query('letter') letter: string,
    @Query('order') order: string,
    @Query('region') region: string,
    @Query('resource') resource: string,
    @Query('season') season: string,
    @Query('status') status: string,
    @Query('year') year: string,
    @Query('page') page: number,
    @Query('size') size: number
  ) {
    const query = {
      genre,
      label,
      letter,
      order,
      region,
      resource,
      season,
      status,
      year,
      page,
      size
    }
    return await this.agefansService.category(query)
  }
}