import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { AncService } from './anc.service'
import { Anc } from './entities/anc.entity'

@Controller('ancs')
export class AncController {
  constructor(private readonly ancService: AncService) {}

  // 创建公告
  @Post()
  create(@Body() ancData: Partial<Anc>): Promise<Anc> {
    return this.ancService.createAnc(ancData)
  }

  // 获取所有公告
  @Get()
  findAll(): Promise<Anc[]> {
    return this.ancService.findAllAncs()
  }

  // 根据 ID 获取公告
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Anc> {
    return this.ancService.findAncById(id)
  }

  // 更新公告
  @Put(':id')
  update(@Param('id') id: string, @Body() ancData: Partial<Anc>): Promise<Anc> {
    return this.ancService.updateAnc(id, ancData)
  }

  // 删除公告
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ancService.deleteAnc(id)
  }
}
