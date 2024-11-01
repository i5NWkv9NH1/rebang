import { Account } from 'src/modules/rbac/account/entities/account.entity'

export interface JwtVerifyPayload {
  account: Account
  //* 代表令牌的主题，通常是用户的唯一标识符
  sub: string
  //*  JWT 的签发时间，即令牌创建的时间戳
  iat: number
  //* 表示 JWT 的过期时间，也是以秒为单位的 Unix 时间
  exp: number
}

export interface HttpContext extends JwtVerifyPayload {}
