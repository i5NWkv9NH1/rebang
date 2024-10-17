import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common'
import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsSemVer,
  IsString,
  Min
} from 'class-validator'
import {
  BaseCrudController,
  IdParamsDto,
  QueryDto
} from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import {
  CreateResourceDto,
  UpdateResourceDto
} from 'src/modules/rbac/resource/dto/create-resource.dto'
import {
  Resource,
  ResourceType
} from 'src/modules/rbac/resource/entities/resource.entity'
import { ResourceService } from 'src/modules/rbac/resource/services/resource.service'
import { FindTreeOptions } from 'typeorm'

export class TreeQueryDto implements FindTreeOptions {
  @IsOptional()
  relations: string[]

  @IsOptional()
  depth: number
}

@UseAdminController('resources', ['1'])
export class AdminResourceController extends BaseCrudController<
  Resource,
  CreateResourceDto,
  {}
> {
  protected readonly logger = new Logger(AdminResourceController.name)

  constructor(private readonly resourceService: ResourceService) {
    super(resourceService)
  }

  @Get(':id/children')
  async findChildren(@Param() params: IdParamsDto) {
    const { id } = params
    const entity = await this.service.findOneWithThrow({ where: { id } })
    return await this.resourceService.findDescendants(entity)
  }

  @Get('groups')
  async findGroups(@Query() query: QueryDto) {
    // return await this.resourceService.findRoots({
    //   relations: ['children']
    // })
    // return await this.resourceService.findGroups()
    const repo = this.resourceService.getResourceRepository()
    const nodes = await repo.find({
      where: { type: ResourceType.Group }
    })
    return this.resourceService.buildGroupTree(nodes)
  }

  @Get('groups/:id/pages')
  async findPagesByGroup(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.resourceService.findPagesByGroup(id)
  }

  @Get('groups/:id')
  async findGroup(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.resourceService.findOneByIdWithThrow(id)
  }

  @Post('groups')
  async createGroup(@Body() dto: CreateResourceDto) {
    return await this.resourceService.createGroup(dto)
  }

  @Put('groups/:id')
  async updateGroup(
    @Body() dto: UpdateResourceDto,
    @Param() params: IdParamsDto
  ) {}

  @Delete('groups/:id')
  async removeGroup(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.resourceService.remove(id)
  }
  @Delete('groups/:id/soft-remove')
  async sortRemoveGroup(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.resourceService.softRemove(id)
  }
  @Patch('groups/:id/recover')
  async recoverGroup(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.resourceService.recover(id)
  }

  @Post('pages')
  async createPage(@Body() dto: CreateResourceDto) {
    return await this.resourceService.createPage(dto)
  }

  @Post('actions')
  async createAction(@Body() dto: CreateResourceDto) {
    return await this.resourceService.createAction(dto)
  }

  @Get('test/find-roots')
  public async findRoots() {
    return await this.resourceService.findRoots()
  }
  @Get('test/find-trees')
  public async findTrees() {
    return await this.resourceService.findTrees()
  }
}
