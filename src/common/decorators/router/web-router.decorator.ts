import { applyDecorators, Controller } from '@nestjs/common'
import { VersionValue } from '@nestjs/common/interfaces'

export function UseWebController(path: string, version?: VersionValue) {
  return applyDecorators(Controller({ path: `web/${path}`, version }))
}
