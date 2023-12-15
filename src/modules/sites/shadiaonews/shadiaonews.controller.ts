import { Controller, Get } from '@nestjs/common'
import { ShadiaonewsService } from './shadiaonews.service'

@Controller('sites/shadiaonews')
export class ShadiaonewsController {
  constructor(private readonly shadiaonewsService: ShadiaonewsService) {}

  @Get('')
  public async start() {
    return await this.shadiaonewsService.start()
  }
}
