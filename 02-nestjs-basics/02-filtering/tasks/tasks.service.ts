import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import {
  GetTaskQuerySortBy,
  GetTasksQueryDto,
} from "./dto/get-tasks-query.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks({ status, sortBy, page, limit }: GetTasksQueryDto): Task[] {
    return [
      this.filterTasks(status),
      this.sliceTasks(page, limit),
      this.sortTasks(sortBy),
    ].reduce((tasks, pipe) => pipe(tasks), this.tasks);
  }

  private filterTasks(status: TaskStatus) {
    return (tasks: Task[]) => {
      return status ? tasks.filter((task) => task.status === status) : tasks;
    };
  }

  private sliceTasks(
    page = 1,
    limit = this.tasks.length,
    _from = (page - 1) * limit,
  ) {
    return (tasks: Task[]) => {
      return page || limit ? tasks.slice(_from, _from + limit) : tasks;
    };
  }

  private sortTasks(sortBy: GetTaskQuerySortBy) {
    return (tasks: Task[]) => {
      switch (sortBy) {
        case GetTaskQuerySortBy.STATUS: {
          return this.sortTasksByStatus(tasks);
        }
        case GetTaskQuerySortBy.TITLE: {
          return this.sortTasksByTitle(tasks);
        }
        default: {
          return tasks;
        }
      }
    };
  }

  private sortTasksByStatus(tasks: Task[]) {
    return tasks.toSorted((a, b) => {
      return Task.getStatusWeight(a.status) - Task.getStatusWeight(b.status);
    });
  }

  private sortTasksByTitle(tasks: Task[]) {
    return tasks.toSorted((a, b) => {
      return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
    });
  }
}
