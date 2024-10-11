import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartConfig } from '../entities/part-config.entity'
import { Website } from '../entities/website.entity'
import { PartService } from './part.service'
import { WebsiteService } from './website.service'
import { Part } from '../entities/part.entity'

@Injectable()
export class PartConfigService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(PartConfig)
    private readonly partConfigRepository: Repository<PartConfig>
  ) {}

  async create(partConfig: PartConfig): Promise<PartConfig> {
    return await this.partConfigRepository.save(partConfig)
  }

  async findAll(): Promise<PartConfig[]> {
    return await this.partConfigRepository.find({ relations: ['part'] })
  }

  async findOne(id: string): Promise<PartConfig> {
    return await this.partConfigRepository.findOne({
      where: { id },
      order: { createdAt: 'ASC', updatedAt: 'ASC' }
    })
  }

  async findOneByPartId(partId: string) {
    return await this.partConfigRepository.findOne({
      relations: ['part'],
      where: {
        part: {
          id: partId
        }
      }
    })
  }

  async update(
    id: string,
    partConfig: Partial<PartConfig>
  ): Promise<PartConfig> {
    await this.partConfigRepository.update(id, partConfig)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.partConfigRepository.delete(id)
  }

  async findActivatedConfig(
    websiteName: string,
    partName: string
  ): Promise<PartConfig | null> {
    const website = await this.websiteRepository.findOne({
      where: { name: websiteName }
    })
    const parts = await this.partRepository.find({
      relations: ['website'],
      where: { website: { id: website.id } }
    })
    const part = parts.find((part) => part.name === partName)

    if (part.activedConfigId) {
      const activatedConfig = await this.partConfigRepository.findOne({
        where: { id: part.activedConfigId }
      })

      if (activatedConfig) {
        return activatedConfig
      }
    }

    const activatedConfig = await this.partConfigRepository.findOne({
      where: { part: { id: part.id }, enabled: true },
      order: { createdAt: 'DESC', updatedAt: 'DESC' },
      relations: ['part']
    })

    return activatedConfig
  }
}
