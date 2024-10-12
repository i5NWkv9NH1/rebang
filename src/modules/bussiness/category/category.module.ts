import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { WebsiteModule } from '../website/website.module'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), WebsiteModule],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
