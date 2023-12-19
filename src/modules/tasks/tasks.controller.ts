import { Controller, Get, Param, Query } from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('')
  public async findAllTask() {
    return await this.taskService.findAllTask()
  }

  @Get(':id')
  public async findTaskByName(@Param() id: string) {
    console.log(id)
    return await this.taskService.findTaskByName(id)
  }
}
