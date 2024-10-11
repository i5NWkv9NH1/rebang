import {
  BeforeApplicationShutdown,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  ShutdownSignal
} from '@nestjs/common'
import { NestApplication } from '@nestjs/core'

@Injectable()
export class ProcessService implements BeforeApplicationShutdown {
  protected readonly logger = new Logger(ProcessService.name)

  beforeApplicationShutdown(signal?: string) {
    console.log('exit')
  }
}
