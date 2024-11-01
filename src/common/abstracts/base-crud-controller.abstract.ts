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
import { AbstractBaseEntity } from '../entities/base.entity'
import { BaseCrudService } from './base-crud-service.abstract'
import { DeepPartial } from 'typeorm'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  itemsPerPage: number = 10

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1
}
export class QueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  filter: string = '{}'
}

export class IdParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string
}

export class BaseDto {
  @IsInt()
  @IsOptional()
  sort: number

  @IsString()
  @IsOptional()
  description: string
}

export abstract class BaseCrudController<
  T extends AbstractBaseEntity,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends DeepPartial<T>
> {
  protected readonly logger: Logger

  constructor(protected readonly service: BaseCrudService<T>) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    try {
      const obj = JSON.parse(query.filter)
      return await this.service.findAll({ ...query, filter: obj })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  async findOne(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.service.findOneByIdWithThrow(id)
  }

  @Post()
  async create(@Body() dto: CreateDto) {
    return await this.service.create(dto)
  }

  @Put(':id')
  async update(@Param() params: IdParamsDto, @Body() dto: UpdateDto) {
    const { id } = params
    return await this.service.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.service.remove(id)
  }
  @Delete(':id/remove')
  async softRemove(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.service.softRemove(id)
  }
  @Patch(':id/recover')
  async recover(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.service.recover(id)
  }
}
