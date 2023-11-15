import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'

interface Tag {
  path: string
  name: string
}

@Injectable()
export abstract class DouyinService {
  private logger = new Logger(DouyinService.name)
  private tags: Tag[] = [
    { path: '/hot', name: '热门视频榜' },
    { path: '/hot', name: '热搜榜' },
    { path: '/hot', name: '正能量榜' },
    { path: '/hot', name: '直播' },
    { path: '/hot', name: '品牌分类' },
    { path: '/hot', name: '品牌榜' },
    { path: '/hot', name: '音乐原创榜' },
    { path: '/hot', name: '音乐热歌榜' },
    { path: '/hot', name: '音乐飙升榜' },
    { path: '/hot', name: '娱乐明星榜' },
    { path: '/hot', name: '体育热力榜' },
    { path: '/hot', name: '体育热力榜' }
  ]

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private httpService: HttpService
  ) {}

  public async hot() {}
}
