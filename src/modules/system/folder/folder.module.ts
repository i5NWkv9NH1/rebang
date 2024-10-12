import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Folder } from './folder.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Folder])]
})
export class FolderModule {}
