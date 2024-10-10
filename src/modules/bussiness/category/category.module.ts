import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { WebsiteModule } from '../website/website.module'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), WebsiteModule],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
