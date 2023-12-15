import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'

export class PengpaiRequestDto {
  @IsArray()
  excludeContIds?: number[] = []

  @IsArray()
  listRecommendIds?: number[] = []

  @IsNumber()
  pageNum?: number = 1

  @IsNumber()
  pageSize?: number = 10

  @IsNumber()
  startTime?: number = new Date().getTime()

  constructor(id: string) {}
}

export class PengpaiChannelDto extends PengpaiRequestDto {
  @IsString()
  @IsNotEmpty()
  channelId: string
  constructor(id: string) {
    super(id)
    this.channelId = id
  }
}
export class PengpaiNodeDto extends PengpaiRequestDto {
  @IsString()
  @IsNotEmpty()
  nodeId: string

  constructor(id: string) {
    super(id)
    this.nodeId = id
  }
}
