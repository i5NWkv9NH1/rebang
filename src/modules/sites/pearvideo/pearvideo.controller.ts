import { Controller, UseInterceptors } from '@nestjs/common'
import { RedisCachingInterceptor } from 'src/shared/redis-caching-interceptor'

@Controller('pearvideo')
@UseInterceptors(RedisCachingInterceptor)
export class PearVideoController {}
