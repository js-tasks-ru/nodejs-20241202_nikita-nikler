import { IsEnum, IsNotEmpty } from "class-validator";
import { Task, TaskStatus } from "../task.model";

export class CreateTaskDto implements Task {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
