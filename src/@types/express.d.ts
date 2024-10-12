import { User } from 'src/modules/bussiness/user/entities/user.entity'
import { Account } from 'src/system/account/entities/account.entity'

declare global {
  namespace Express {
    interface Request {
      user?: User
      account?: Account
    }
  }
}
