import { Module } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { WeatherController } from './weather.controller'
import { SeniverseSerivce } from './seniverse.service'

@Module({
  providers: [WeatherService, SeniverseSerivce],
  exports: [WeatherService, SeniverseSerivce],
  controllers: [WeatherController]
})
export class WeatherModule {}
