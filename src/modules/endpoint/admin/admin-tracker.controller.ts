import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { CreateTrackerDto } from 'src/modules/bussiness/tracker/dto/create-tracker.dto'
import { UpdateTrackerDto } from 'src/modules/bussiness/tracker/dto/update-tracker.dto'
import { TrackerService } from 'src/modules/bussiness/tracker/tracker.service'

@Controller('tracker')
export class AdminTrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post()
  create(@Body() createTrackerDto: CreateTrackerDto) {
    return this.trackerService.create(createTrackerDto)
  }

  @Get()
  findAll() {
    return this.trackerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackerDto: UpdateTrackerDto) {
    return this.trackerService.update(+id, updateTrackerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackerService.remove(+id)
  }
}
