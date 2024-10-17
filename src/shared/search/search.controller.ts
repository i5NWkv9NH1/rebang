import { Controller, Get, Param, Query } from '@nestjs/common'
import { SearchService } from './search.service'
import {
  IsAlpha,
  IsArray,
  IsDataURI,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPort,
  IsString
} from 'class-validator'
import { SearchParams, TasksQuery, TaskStatus, TaskTypes } from 'meilisearch'

export class SearchIndexDto {
  @IsString()
  @IsNotEmpty()
  index: string
}

export class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  index: string

  @IsString()
  @IsOptional()
  q?: string

  @IsOptional()
  @IsInt()
  itemsPerPage?: number = 20

  @IsOptional()
  @IsInt()
  page?: number = 0
}

export class SearchTaskDto implements TasksQuery {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  indexUids?: string[]

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  uids?: number[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  types?: TaskTypes[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  statuses?: TaskStatus[]

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  canceledBy?: number[]

  @IsDate()
  @IsOptional()
  beforeEnqueuedAt?: Date

  @IsDate()
  @IsOptional()
  afterEnqueuedAt?: Date

  @IsDate()
  @IsOptional()
  beforeStartedAt?: Date

  @IsDate()
  @IsOptional()
  afterStartedAt?: Date

  @IsDate()
  @IsOptional()
  beforeFinishedAt?: Date

  @IsDate()
  @IsOptional()
  afterFinishedAt?: Date

  @IsInt()
  @IsOptional()
  limit?: number

  @IsInt()
  @IsOptional()
  from?: number
}

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('index/:index')
  async findIndex(@Param() searchIndexDto: SearchIndexDto) {
    return await this.searchService.getIndex(searchIndexDto.index)
  }

  @Get('index/:index/tasks')
  async findTaskByIndex(
    @Param() searchIndexDto: SearchIndexDto,
    @Query() query: SearchTaskDto
  ) {
    const index = await this.searchService.getIndex(searchIndexDto.index)
    return await index.getTasks(query)
  }

  @Get('index')
  async findSearchWithWebsite(@Query() query: SearchQueryDto) {
    return await this.searchService.search(query.index, query.q || '')
  }
}
