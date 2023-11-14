import { Injectable } from '@nestjs/common'
import { ITHomeService } from '../sites/ithome.service'
import { ZhihuService } from '../sites/zhihu.service'
import { WeiboService } from '../sites/weibo.service'

@Injectable()
export class TasksService {
  constructor(
    private readonly itHomeService: ITHomeService,
    private readonly zhihuService: ZhihuService,
    private readonly weiboService: WeiboService
  ) {}
}
