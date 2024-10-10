import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Website } from '../entities/website.entity'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>
  ) {}

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
