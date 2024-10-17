import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { AdService } from 'src/modules/bussiness/ad/services/ad.service'
import { Ad } from 'src/modules/bussiness/ad/entities/ad.entity'
import { AdStatService } from 'src/modules/bussiness/ad/services/ad-stat.service'
import { Logger } from '@nestjs/common'

@UseAdminController('ads', ['1'])
export class AdminAdController extends BaseCrudController<Ad, {}, {}> {
  protected readonly logger = new Logger(AdminAdController.name)

  constructor(
    private readonly adService: AdService,
    private readonly adStatService: AdStatService
  ) {
    super(adService)
  }
}
