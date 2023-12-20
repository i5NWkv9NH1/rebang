import { Controller, Get } from '@nestjs/common'
import { GhxiService } from './ghxi.service'

@Controller('sites/ghxi')
export class GhxiController {
  constructor(private readonly ghxiService: GhxiService) {}

  @Get('latest')
  async latest() {
    return await this.ghxiService.latest()
  }
  @Get('pc')
  async pc() {
    return await this.ghxiService.pc()
  }
  @Get('android')
  async android() {
    return await this.ghxiService.android()
  }
}
