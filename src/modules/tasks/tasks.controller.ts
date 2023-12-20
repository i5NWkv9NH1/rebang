import { Controller, Delete, Get, Logger, Param, Query } from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name)

  constructor(private readonly taskService: TasksService) {}

  @Get('')
  async findAll() {
    return await this.taskService.findAllTask()
  }
}
