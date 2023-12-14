import { Controller, Get, Logger, Query } from '@nestjs/common'
import { SeniverseSerivce } from './seniverse.service'

@Controller('weather')
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name)

  constructor(private readonly seniverseService: SeniverseSerivce) {}

  @Get('seniverse/now')
  public async findNow(@Query('location') location: string) {
    return await this.seniverseService.now(location)
  }
  @Get('seniverse/daily')
  public async findDaily(
    @Query('location') location: string,
    @Query('days') days: number
  ) {
    return await this.seniverseService.daily(location, days)
  }
  @Get('seniverse/city')
  public async findCity(@Query('city') city: string) {
    return await this.seniverseService.findCity(city)
  }
}
