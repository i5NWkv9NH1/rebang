import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync
} from 'node:crypto'

const algorithm = 'aes-256-cbc' // Use AES 256-bit encryption
const key = randomBytes(32) // Generate a random 32-byte key
const iv = randomBytes(16) // Generate a random 16-byte IV

function encrypt(data) {
  // Function to encrypt data
  let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(data)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  }
}

function decrypt(data) {
  // Function to decrypt data
  let iv = Buffer.from(data.iv, 'hex')
  let encryptedText = Buffer.from(data.encryptedData, 'hex')
  let decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
// const decipher = createDecipheriv(algorithm, key, iv);
// var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

export interface Response<T> {
  statusCode: number
  message: string
  data: any
}

@Injectable()
export class PaginateTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // const { iv, encryptedData } = encrypt(JSON.stringify(data))

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message || 'success',
          data
        }
      })
    )
  }
}
