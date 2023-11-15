import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class JuejinService {
  private logger = new Logger(JuejinService.name)

  constructor(private httpService: HttpService) {}

  //#region 综合
  public async mix() {
    const url =
      'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&aid=2608&uuid=7301602800306226727&spider=0'

    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  //#region 后端
  public async be() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637769959178254&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  //#region 前端
  public async fe() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637767543259144&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  public async android() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809635626879549454&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }

  public async iOS() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809635626661445640&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }

  //#region 人工智能
  public async ai() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637773935378440&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }

  //#region 开发工具
  public async develop() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637771511070734&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  //#region 代码人生
  public async code() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637776263217160&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  //#region 阅读
  public async read() {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637772874219534&type=hot&aid=2608&uuid=7301602800306226727&spider=0`
    const response = await this.http(url)
    return this.transformFields(response.data)
  }
  //#endregion

  public async http<T>(url: string, headers: {} = {}) {
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
  public transformFields(data: any) {
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
