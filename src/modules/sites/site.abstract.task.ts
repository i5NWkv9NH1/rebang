import { Injectable } from '@nestjs/common'
import { SiteAbstractService } from './sites.abstract.service'

@Injectable()
export abstract class SiteAbstractTask {
  constructor(private readonly siteAbstractService: SiteAbstractService) {}
}
