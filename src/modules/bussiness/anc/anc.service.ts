import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Anc } from './entities/anc.entity'

@Injectable()
export class AncService {
  constructor(
    @InjectRepository(Anc)
    private announcementRepository: Repository<Anc>
  ) {}

  // 创建公告
  async createAnc(ancData: Partial<Anc>): Promise<Anc> {
    const anc = this.announcementRepository.create(ancData)
    return this.announcementRepository.save(anc)
  }

  // 获取所有公告
  async findAllAncs(): Promise<Anc[]> {
    return this.announcementRepository.find()
  }

  // 根据 ID 获取公告
  async findAncById(id: string): Promise<Anc> {
    return this.announcementRepository.findOneBy({ id })
  }

  // 更新公告
  async updateAnc(id: string, announcementData: Partial<Anc>): Promise<Anc> {
    await this.announcementRepository.update(id, announcementData)
    return this.findAncById(id)
  }

  // 删除公告
  async deleteAnc(id: string): Promise<void> {
    await this.announcementRepository.delete(id)
  }
}
