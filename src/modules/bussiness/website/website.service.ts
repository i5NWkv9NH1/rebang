import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Website } from './entities/website.entity'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>
  ) {}

  /**
   * 根据 ID 查找网站
   * @param id 网站 ID
   * @returns {Promise<Website>} 网站实体
   */
  async findOne(id: string): Promise<Website> {
    return await this.websiteRepository.findOne({ where: { id } })
  }

  async findOneByName(name: string): Promise<Website> {
    return await this.websiteRepository.findOne({ where: { name } })
  }

  /**
   * 根据 ID 数组查找多个网站
   * @param ids 网站 ID 数组
   * @returns {Promise<Website[]>} 网站实体数组
   */
  async findByIds(ids: string[]): Promise<Website[]> {
    return await this.websiteRepository.findBy({ id: In(ids) })
  }

  /**
   * 查找所有网站
   * @returns {Promise<Website[]>} 所有网站实体数组
   */
  async findAll(): Promise<Website[]> {
    return await this.websiteRepository.find()
  }

  /**
   * 创建新的网站
   * @param websiteData 新网站的数据
   * @returns {Promise<Website>} 创建的网站实体
   */
  async create(websiteData: Partial<Website>): Promise<Website> {
    const newWebsite = this.websiteRepository.create(websiteData)
    return await this.websiteRepository.save(newWebsite)
  }

  /**
   * 更新网站
   * @param id 网站 ID
   * @param websiteData 更新的数据
   * @returns {Promise<Website>} 更新后的网站实体
   */
  async update(id: string, websiteData: Partial<Website>): Promise<Website> {
    await this.websiteRepository.update(id, websiteData)
    return this.findOne(id)
  }

  /**
   * 删除网站
   * @param id 网站 ID
   * @returns {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    await this.websiteRepository.delete(id)
  }
}
