import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query
} from '@nestjs/common'
import { WebsiteService } from './website.service'
import { RedisService } from 'src/shared/services/redis.service'
import { PartService } from './services/part.service'
import { PartConfigService } from './services/part-config.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Website } from './entities/website.entity'
import { Repository } from 'typeorm'
import { Part } from './entities/part.entity'
import { PartConfig } from './entities/part-config.entity'
import { WebsiteQueryDto } from './dtos/website-query.dto'

@Controller('website')
export class WebsiteContoller {
  constructor(
    // private readonly websiteSerivce: WebsiteService,
    // private readonly partService: PartService,
    // private readonly partConfigService: PartConfigService,
    private readonly redisService: RedisService,

    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(PartConfig)
    private readonly partConfigRepository: Repository<PartConfig>
  ) {}

  @Get()
  async find(@Query() query: WebsiteQueryDto) {
    const { site: siteName, part: partName } = query
    // const website = await this.websiteSerivce.findOneByName(siteName)
    // const parts = await this.partService.findByWebsiteId(website.id)
    // const part = parts.find((_) => _.name === partName)
    // const config = await this.partConfigService.findOneByPartId(part.id)
    // const { redisKey } = config
    // return await this.redisService.get(redisKey)

    // *
    const website = await this.websiteRepository.findOne({
      where: { name: siteName }
    })
    if (!website) {
      throw new NotFoundException('Website not found')
    }
    const part = await this.partRepository.findOne({
      relations: ['website'],
      where: { website: { id: website.id }, name: partName }
    })
    if (!part) throw new NotFoundException('Part not found')

    let config: PartConfig
    if (part.activedConfigId) {
      config = await this.partConfigRepository.findOne({
        relations: ['part'],
        where: { id: part.activedConfigId }
      })
    } else {
      config = await this.partConfigRepository.findOne({
        relations: ['part'],
        where: { part: { id: part.id }, enabled: true },
        order: { createdAt: 'DESC', updatedAt: 'DESC' }
      })
    }

    if (!config.redisKey) {
      throw new BadRequestException('Redis key not found')
    }

    return await this.redisService.get(config.redisKey)
  }
}
