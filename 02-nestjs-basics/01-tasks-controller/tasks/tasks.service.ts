import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private nextId = "0";
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const index = this.findTaskIndex(id);
    return this.tasks[index];
  }

  createTask(task: Task): Task {
    const id = this.generateId();
    const createdTaks = { ...task, id };

    this.tasks.push(createdTaks);
    return createdTaks;
  }

  updateTask(id: string, update: Task): Task {
    const index = this.findTaskIndex(id);

    if (index === -1) return undefined;

    return (this.tasks[index] = {
      ...this.tasks[index],
      ...update,
    });
  }

  deleteTask(id: string): Task {
    const index = this.findTaskIndex(id);
    const task = this.tasks[index];

    if (index === -1) return undefined;

    this.tasks.splice(index, 1);
    return task;
  }

  private findTaskIndex(id: string) {
    return this.tasks.findIndex((task) => task.id === id);
  }

  private generateId(): string {
    return (this.nextId = String(Number(this.nextId) + 1));
  }
}
