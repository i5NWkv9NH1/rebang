import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { AncService } from 'src/modules/bussiness/anc/anc.service'
import { Anc } from 'src/modules/bussiness/anc/entities/anc.entity'

@UseAdminController('ancs', ['1'])
export class AdminAncController extends BaseCrudController<Anc, {}, {}> {
  constructor(private readonly ancService: AncService) {
    super(ancService)
  }
}
