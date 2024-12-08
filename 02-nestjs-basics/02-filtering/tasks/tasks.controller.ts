import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { GetTasksQueryDto } from "./dto/get-tasks-query.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() query: GetTasksQueryDto) {
    return this.tasksService.getFilteredTasks(query);
  }
}
