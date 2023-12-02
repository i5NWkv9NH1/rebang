import { Controller, Get } from '@nestjs/common'
import { HistoryService } from './history.service'

@Controller('sites/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('360')
  public async _360() {
    return await this.historyService._360()
  }
}
