import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Part } from '../entities/part.entity'

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>
  ) {}

  async create(part: Part): Promise<Part> {
    return await this.partRepository.save(part)
  }

  async findAll(): Promise<Part[]> {
    return await this.partRepository.find({ relations: ['website'] })
  }

  /**
   * 根据 ID 数组查找多个部分
   * @param ids 部分 ID 数组
   * @returns {Promise<Part[]>} 部分实体数组
   */
  async findByIds(ids: string[]): Promise<Part[]> {
    return await this.partRepository.findBy({ id: In(ids) })
  }

  async findOne(id: string): Promise<Part> {
    return await this.partRepository.findOne({
      where: { id },
      relations: ['website']
    })
  }

  async findOneByName(websiteName: string, partName: string): Promise<Part> {
    return await this.partRepository.findOne({
      relations: ['website'],
      where: { website: { name: websiteName }, name: partName }
    })
  }

  async findByWebsiteId(id: string) {
    return await this.partRepository.find({
      relations: ['website'],
      where: { website: { id } }
    })
  }

  async update(id: string, part: Partial<Part>): Promise<Part> {
    await this.partRepository.update(id, part)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.partRepository.delete(id)
  }
}
