import { User } from 'src/modules/bussiness/user/entities/user.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { HttpContext, JwtVerifyPayload } from './http-context'

declare global {
  namespace Express {
    interface Request {
      payload: HttpContext
    }
  }
}
