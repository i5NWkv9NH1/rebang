import { applyDecorators, Controller } from '@nestjs/common'
import { VersionValue } from '@nestjs/common/interfaces'

export function UseAdminController(path: string, version?: VersionValue) {
  return applyDecorators(Controller({ path: `admin/${path}`, version }))
}
