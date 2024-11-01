import { SetMetadata } from '@nestjs/common'

export const RequireActions = (actions: string[]) =>
  SetMetadata('actions', actions)
