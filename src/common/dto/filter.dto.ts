import { IsOptional } from 'class-validator'

export interface FilterParam {
  [key: string]: any
  startAt: string
  endAt: string
}

export class FilterDto {
  @IsOptional()
  startAt?: string
  @IsOptional()
  endAt?: string
}
