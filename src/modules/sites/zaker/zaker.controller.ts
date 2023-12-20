import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ZakerService } from './zaker.service'
import { RedisCachingInterceptor } from 'src/shared/redis-caching-interceptor'

@Controller('sites/zaker')
@UseInterceptors(RedisCachingInterceptor)
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
