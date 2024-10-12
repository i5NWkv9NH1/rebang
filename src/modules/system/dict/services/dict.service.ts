import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dict } from '../entities/dict.entity'
import { Repository } from 'typeorm'
import { DictItem } from '../entities/dict-detail.entity'

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dictRepository: Repository<Dict>,
    @InjectRepository(DictItem)
    private readonly dictItemRepository: Repository<DictItem>
  ) {}
}
