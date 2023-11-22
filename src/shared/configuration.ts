import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join, resolve } from 'path'

const CONFIG_FILE_NAME = 'config.yaml'

export interface IConfigs {
  http: HttpConfig
}

export interface HttpConfig {
  host: string
  port: number
  proxy: {
    server: string
  }
}

export default () => {
  console.log(resolve(__dirname))
  return yaml.load(
    readFileSync(resolve(__dirname, '..', '..', CONFIG_FILE_NAME), 'utf8')
  ) as Record<string, any>
}
