import { Injectable, LoggerService } from '@nestjs/common'
import winston from 'winston'
import winstonDailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export class LoggingService implements LoggerService {
  logger: winston.Logger

  constructor(name: any) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss' // タイムスタンプのフォーマットを変える
        }),
        winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
        winston.format.printf(
          (info) => `[${info.timestamp}] [${info.level}] ${info.message}` // 出力内容をカスタマイズする
        )
      ),
      defaultMeta: () => name,
      transports: [
        // アクセスログの出力先設定
        new winstonDailyRotateFile({
          level: 'debug', // debugを指定すると、debug以上のログが出力される
          datePattern: 'YYYY-MM-DD', // 'YYYY-MM-DD'に設定すると、ログファイルが日付毎に作られる
          filename: 'application-%DATE%.log', // 保存先ファイル名(上記のdatePatternが含まれる)
          dirname: 'logs', // ログファイルの保存先ディレクトリ名
          maxSize: '20m', // ローテートするファイルの最大サイズ
          maxFiles: '30d' // 保存するログの最大数(日数を使う場合は接尾辞として'd'を追加)
        }),
        // エラーログの出力先設定
        new winstonDailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: 'error-%DATE%.log',
          dirname: 'logs',
          maxSize: '20m',
          maxFiles: '30d'
        })
      ]
    })
  }

  //? NestJS標準のLoggerServiceをimplementsしているため、log() error() warn() debug() verbose()を実装する
  log(message: string) {
    this.logger.log({
      level: 'info',
      message: `${message}`
    })
  }

  error(message: string, trace: string) {
    this.logger.log({
      level: 'error',
      message: `${message}:${trace}`
    })
  }

  warn(message: string) {
    this.logger.log({
      level: 'warn',
      message: `${message}`
    })
  }

  debug(message: string) {
    this.logger.log({
      level: 'debug',
      message: `${message}`
    })
  }

  verbose(message: string) {
    this.logger.log({
      level: 'verbose',
      message: `${message}`
    })
  }
}
