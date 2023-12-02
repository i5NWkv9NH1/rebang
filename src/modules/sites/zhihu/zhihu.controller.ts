import { Controller, Get } from '@nestjs/common'
import { ZhihuService } from './zhihu.service'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuTask } from './zhihu.task'

@Controller('sites/zhihu')
export class ZhihuController {
  constructor(
    private readonly redisService: RedisService,
    private readonly zhihuService: ZhihuService,
    private readonly zhihuTask: ZhihuTask
  ) {}

  @Get('billboard')
  public async billboard() {
    return await this.zhihuService.fetchBillboard()
  }
}
