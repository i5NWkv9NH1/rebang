import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { SitesEntity } from './sites.entity'

@Injectable()
export class SitesService extends TypeOrmCrudService<SitesEntity> {
  constructor(@InjectRepository(SitesEntity) repo) {
    super(repo)
  }
}
