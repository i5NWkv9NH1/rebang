import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'
import { IsPureString } from 'src/shared/decorators/pure-string.decorator'
export class WebsiteQueryDto {
  @IsNotEmpty()
  @IsString()
  @IsPureString()
  site: string

  @IsNotEmpty()
  @IsString()
  @IsPureString()
  part: string
}
