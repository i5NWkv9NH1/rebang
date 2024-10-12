import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UpdateAccountDto {
  @IsString()
  @IsNotEmpty()
  username: string
  // ... fields
}
