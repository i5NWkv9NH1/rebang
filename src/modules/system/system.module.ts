import { Module } from '@nestjs/common'
import { DictModule } from './dict/dict.module'
import { LogModule } from './log/log.module'
import { RegionModule } from './region/region.module'
import { FolderModule } from './folder/folder.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    //* 字典
    DictModule,
    //* 日志：登陆日志、操作日志，LogModule 聚合导出
    LogModule,
    //* 地区
    RegionModule,
    //* 文件夹和文件管理
    FolderModule,
    FileModule
  ]
})
export class SystemModule {}
