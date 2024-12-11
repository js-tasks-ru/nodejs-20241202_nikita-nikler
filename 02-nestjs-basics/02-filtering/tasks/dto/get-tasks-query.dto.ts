import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { TaskStatus } from "../task.model";

export enum GetTaskQuerySortBy {
  STATUS = "status",
  TITLE = "title",
}

export class GetTasksQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsEnum(GetTaskQuerySortBy)
  sortBy?: GetTaskQuerySortBy;
}
