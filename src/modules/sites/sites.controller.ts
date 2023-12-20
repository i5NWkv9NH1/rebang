import { Controller } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { SitesEntity } from './sites.entity'
import { SitesService } from './sites.service'

@Crud({
  model: {
    type: SitesEntity
  }
})
@Controller('sites')
export class SitesController implements CrudController<SitesEntity> {
  constructor(public service: SitesService) {}
}
