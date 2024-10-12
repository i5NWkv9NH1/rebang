import { IsOptional } from 'class-validator'

export interface PaginationParam {
  itemsPerPage: number
  page: number
}

export class PaginationDto {
  @IsOptional()
  itemsPerPage: number = 10
  @IsOptional()
  page: number = -1
}
