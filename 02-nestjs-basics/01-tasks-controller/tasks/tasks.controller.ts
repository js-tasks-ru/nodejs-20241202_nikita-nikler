import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const res = this.tasksService.getTaskById(id);

    if (!res) throw new NotFoundException();
    return res;
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    const res = this.tasksService.updateTask(id, task);

    if (!res) throw new NotFoundException();
    return res;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const res = this.tasksService.deleteTask(id);

    if (!res) throw new NotFoundException();
    return res;
  }
}
