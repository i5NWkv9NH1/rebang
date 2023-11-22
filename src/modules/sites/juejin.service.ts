import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class JuejinService {
  private logger = new Logger(JuejinService.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 综合
  public async mix() {
    const cache = await this.redisService.get('juejin/mix')
    if (cache) return cache

    const url =
      'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&aid=2608&uuid=7301602800306226727&spider=0'

    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/mix', data)

    return data
  }
  //#endregion

  //#region 后端
  public async be() {
    const cache = await this.redisService.get('juejin/be')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637769959178254&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/be', data)

    return data
  }
  //#endregion

  //#region 前端
  public async fe() {
    const cache = await this.redisService.get('juejin/fe')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637767543259144&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/fe', data)

    return data
  }
  //#endregion

  public async android() {
    const cache = await this.redisService.get('juejin/android')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809635626879549454&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/android', data)

    return data
  }

  public async iOS() {
    const cache = await this.redisService.get('juejin/iOS')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809635626661445640&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/iOS', data)

    return data
  }

  //#region 人工智能
  public async ai() {
    const cache = await this.redisService.get('juejin/ai')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637773935378440&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/ai', data)

    return data
  }

  //#region 开发工具
  public async develop() {
    const cache = await this.redisService.get('juejin/develop')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637771511070734&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/develop', data)

    return data
  }
  //#endregion

  //#region 代码人生
  public async code() {
    const cache = await this.redisService.get('juejin/code')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637776263217160&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/code', data)

    return data
  }
  //#endregion

  //#region 阅读
  public async read() {
    const cache = await this.redisService.get('juejin/read')
    if (cache) return cache

    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637772874219534&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.get(url)
    const data = this.transformFields(response.data)
    await this.redisService.set('juejin/read', data)

    return data
  }
  //#endregion

  public async get<T>(url: string, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          })
        )
    )
    return response
  }

  //* data is response.body
  //* it include data content
  public async transformFields(data: any) {
    return data.data.map((item) => {
      const title = item.content.title
      const metrics = item.content_counter
      const author = {
        ...item.author,
        avatarUrl: item.author.avatar
      }

      return {
        ...item,
        author,
        title,
        metrics
      }
    })
  }
}
