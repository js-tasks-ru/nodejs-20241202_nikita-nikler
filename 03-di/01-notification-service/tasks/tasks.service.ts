import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";

enum NotificationType {
  NewTask = "Новая задача",
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const { email } = this.userService.getUserById(assignedTo);
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    const message = this.getCreateTaskMessage(task);

    this.tasks.push(task);
    this.notificationService.sendEmail(
      email,
      NotificationType.NewTask,
      message,
    );

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.getTaskById(id);
    const { assignedTo } = task;
    const { phone } = this.userService.getUserById(assignedTo);
    const message = this.getUpdateTaskMessage(task, updateTaskDto);

    Object.assign(task, updateTaskDto);
    this.notificationService.sendSMS(phone, message);

    return task;
  }

  private getTaskById(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Задача с ID ${id} не найдена`);
    return task;
  }

  private getCreateTaskMessage(task: Task) {
    return `Вы назначены ответственным за задачу: "${task.title}"`;
  }

  /**
   * Получить набор сообщений об изменениях таски ,разделенных переносом строки
   * @param task
   * @param updated
   * @returns
   */
  private getUpdateTaskMessage(task: Task, updated: UpdateTaskDto) {
    const { title, description, status } = task;
    const messagesList = [];

    if (updated.status && status !== updated.status) {
      messagesList.push(
        `Статус задачи "${title}" обновлён на "${updated.status}"`,
      );
    }
    if (updated.title && title !== updated.title) {
      messagesList.push(
        `Заголовок задачи "${title}" обновлён на "${updated.title}"`,
      );
    }
    if (updated.description && description !== updated.description) {
      messagesList.push(
        `Описание задачи "${title}" обновлено на "${updated.description}"`,
      );
    }

    return messagesList.join("\n");
  }
}
