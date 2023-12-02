import { Controller, Get } from '@nestjs/common'
import { JuejinService } from './juejin.service'

@Controller('sites/juejin')
export class JuejinController {
  constructor(private readonly juejinService: JuejinService) {}

  @Get('mix')
  public async juejinMix() {
    return await this.juejinService.mix()
  }
  @Get('be')
  public async juejinBE() {
    return await this.juejinService.be()
  }
  @Get('fe')
  public async juejinFE() {
    return await this.juejinService.fe()
  }
  @Get('android')
  public async juejinAndroid() {
    return await this.juejinService.android()
  }
  @Get('ios')
  public async juejiniOS() {
    return await this.juejinService.iOS()
  }
  @Get('ai')
  public async juejinAI() {
    return await this.juejinService.ai()
  }
  @Get('develop')
  public async juejinDevelop() {
    return await this.juejinService.develop()
  }
  @Get('code')
  public async juejinCode() {
    return await this.juejinService.code()
  }
  @Get('read')
  public async juejinRead() {
    return await this.juejinService.read()
  }
}
