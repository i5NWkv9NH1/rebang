import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor() {}
}
