import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartScraped } from '../entities/part-scraped.entity'
import { Website } from '../entities/website.entity'
import { privateDecrypt } from 'crypto'
import { Part } from '../entities/part.entity'

@Injectable()
export class PartScrapedService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(PartScraped)
    private readonly partScrapedRepository: Repository<PartScraped>
  ) {}

  async createScrapedPart(
    data: PartScraped,
    websiteName: string,
    partName: string
  ): Promise<PartScraped> {
    // 先通过网站名称查找 Website 实体
    const website = await this.websiteRepository.findOne({
      where: { name: websiteName },
      relations: ['parts'] // 确保加载 parts 关系
    })

    if (!website) {
      throw new NotFoundException(
        `Website with name "${websiteName}" not found`
      )
    }

    // 在该网站的 parts 中查找对应的 Part 实体
    const part = website.parts.find((p) => p.name === partName)

    if (!part) {
      throw new NotFoundException(
        `Part with name "${partName}" not found in website "${websiteName}"`
      )
    }

    // 创建 PartScraped 实体
    const partScraped = this.partScrapedRepository.create({ ...data, part })

    // 保存到数据库
    return await this.partScrapedRepository.save(partScraped)
  }

  async create(partScraped: PartScraped): Promise<PartScraped> {
    return await this.partScrapedRepository.save(partScraped)
  }

  async findAll(): Promise<PartScraped[]> {
    return await this.partScrapedRepository.find({ relations: ['part'] })
  }

  async findOne(id: string): Promise<PartScraped> {
    return await this.partScrapedRepository.findOne({
      where: { id },
      relations: ['part']
    })
  }

  async update(
    id: string,
    partScraped: Partial<PartScraped>
  ): Promise<PartScraped> {
    await this.partScrapedRepository.update(id, partScraped)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.partScrapedRepository.delete(id)
  }
}
