import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ZakerService } from './zaker.service'

@Controller('sites/zaker')
export class ZakerController {
  constructor(private readonly zakerService: ZakerService) {}

  @Post('hot')
  public async hot(@Body() queryHotDto?: { nextUrl: string }) {
    console.log(queryHotDto.nextUrl)
    return await this.zakerService.hot(queryHotDto.nextUrl)
  }

  @Post('onlyone')
  public async onlyone(@Body() queryHotDto?: { nextUrl: string }) {
    return await this.zakerService.onlyone(queryHotDto.nextUrl)
  }
}
