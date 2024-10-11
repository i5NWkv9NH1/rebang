import { Module, DynamicModule, Provider, Type } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'

interface ScraperModuleOptions {
  queueName: string // 队列名称
  modules?: Type<any>[] // 依赖模块
  processor: Type<any> // 处理器类
  service: Type<any> // 服务类
  scrapy: Type<any> // 爬虫逻辑类
}

export class ScraperModule {
  static register(options: ScraperModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.service, // 服务类注入
      options.processor, // 处理器类注入
      options.scrapy // 爬虫逻辑类注入
    ]

    return {
      module: ScraperModule,
      imports: [
        BullModule.registerQueue({ name: options.queueName }), // 动态注册队列
        ...(options.modules || [])
      ],
      providers: providers,
      exports: providers
    }
  }
}
