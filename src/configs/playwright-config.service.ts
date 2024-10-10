import { Injectable, Logger } from '@nestjs/common'
import {
  PlaywrightModuleOptions,
  PlaywrightOptionsFactory
} from 'nestjs-playwright'

@Injectable()
export class PlaywrightConfigService implements PlaywrightOptionsFactory {
  createPlaywrightOptions():
    | Promise<PlaywrightModuleOptions>
    | PlaywrightModuleOptions {
    return {
      instanceName: 'default',
      launchOptions: {
        chromiumSandbox: true,
        headless: true,
        executablePath: `/opt/homebrew/Caskroom/google-chrome/129.0.6668.71/Google\ Chrome.app/Contents/MacOS/Google\ Chrome`
      }
    }
  }
}
