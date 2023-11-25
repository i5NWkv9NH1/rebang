import { Controller, Get } from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('')
  public findAll() {
    this.taskService.findAllTask()
  }
}
