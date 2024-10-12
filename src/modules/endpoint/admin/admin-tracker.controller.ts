import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { Tracker } from 'src/modules/bussiness/tracker/entities/tracker.entity'
import { TrackerService } from 'src/modules/bussiness/tracker/tracker.service'

@UseAdminController('trackers', ['1', '2'])
export class AdminTrackerController extends BaseCrudController<
  Tracker,
  {},
  {}
> {
  constructor(private readonly trackerService: TrackerService) {
    super(trackerService)
  }
}
