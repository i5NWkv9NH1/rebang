// base-upload.service.ts
import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { extname } from 'path'
import { promises as fs } from 'fs'
import type { Multer } from 'multer'

export abstract class UploadService {
  protected abstract uploadDir: string

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuid()}${extname(file.originalname)}`
    const filePath = `${this.uploadDir}/${fileName}`

    // 保存文件到指定目录
    await fs.writeFile(filePath, file.buffer)

    return filePath
  }
}
