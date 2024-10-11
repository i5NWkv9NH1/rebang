import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { Website } from '../entities/website.entity'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>
  ) {}

  async findPartsWithConfig(websiteName: string) {
    const parts = await this.websiteRepository
      .createQueryBuilder('website')
      .innerJoinAndSelect('website.parts', 'part') // 关联网站与部分
      .innerJoinAndSelect('part.configs', 'config') // 关联部分与配置
      .where('website.name = :name', { name: websiteName }) // 使用传入的参数
      // .andWhere(
      //   new Brackets((qb) => {
      //     qb.where('part.activedConfigId IS NOT NULL') // 如果 activedConfigId 存在
      //       .andWhere('config.id = part.activedConfigId') // 查找对应的 config id
      //       .orWhere('part.activedConfigId IS NULL') // 如果 activedConfigId 不存在
      //       .andWhere('config.enabled = :enabled', { enabled: true }) // 查找 enabled 为 true 的 config
      //   })
      // )
      // .getMany()
      .getOne()

    return parts
  }

  async create(website: Website): Promise<Website> {
    return await this.websiteRepository.save(website)
  }

  async findAll(): Promise<Website[]> {
    return await this.websiteRepository.find()
  }

  async findOne(id: string): Promise<Website> {
    return await this.websiteRepository.findOne({ where: { id } })
  }

  async findOneByName(name: string): Promise<Website> {
    return await this.websiteRepository.findOne({ where: { name } })
  }

  async update(id: string, website: Partial<Website>): Promise<Website> {
    await this.websiteRepository.update(id, website)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.websiteRepository.delete(id)
  }
}
