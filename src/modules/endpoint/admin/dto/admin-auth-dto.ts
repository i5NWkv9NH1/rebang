import { IsString, IsNotEmpty } from 'class-validator'

export class AdminAuthSigninDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class AdminAuthSignupDto extends AdminAuthSigninDto {}
