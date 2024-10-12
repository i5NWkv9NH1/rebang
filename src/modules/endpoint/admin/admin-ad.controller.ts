import { Post, Get, Put, Body, Param, Logger } from '@nestjs/common'
import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { AdService } from 'src/modules/bussiness/ad/services/ad.service'
import { Ad } from 'src/modules/bussiness/ad/entities/ad.entity'
import { AdStatService } from 'src/modules/bussiness/ad/services/ad-stat.service'

@UseAdminController('ads', ['1', '2'])
export class AdminAdController extends BaseCrudController<Ad, {}, {}> {
  protected readonly logger = new Logger(AdminAdController.name)

  constructor(
    private readonly adService: AdService,
    private readonly adStatService: AdStatService
  ) {
    super(adService)
  }
}
