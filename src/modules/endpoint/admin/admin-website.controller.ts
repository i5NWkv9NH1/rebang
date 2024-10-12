import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { Website } from 'src/modules/bussiness/website/entities/website.entity'
import { WebsiteService } from 'src/modules/bussiness/website/services/website.service'

@UseAdminController('websites')
export class AdminWebsiteController extends BaseCrudController<
  Website,
  {},
  {}
> {
  constructor(private readonly websiteService: WebsiteService) {
    super(websiteService)
  }
}
