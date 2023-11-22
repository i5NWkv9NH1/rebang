import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'
import { Redis } from 'ioredis'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { RedisService } from 'src/shared/redis.service'
import { Tag } from 'src/types'

@Injectable()
export abstract class DouyinService {
  private logger = new Logger(DouyinService.name)

  //TODO
  private headers: AxiosRequestConfig['headers'] = {}
  private proxy: AxiosRequestConfig['proxy'] = false
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
    private readonly redisService: RedisService,
    @InjectBrowser() private readonly browser: Browser,
    private httpService: HttpService
  ) {}
}
