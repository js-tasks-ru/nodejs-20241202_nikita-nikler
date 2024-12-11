export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export abstract class Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;

  static getStatusWeight(status: TaskStatus) {
    switch (status) {
      case TaskStatus.PENDING:
        return 0;
      case TaskStatus.IN_PROGRESS:
        return 1;
      case TaskStatus.COMPLETED:
        return 2;
      default:
        return Infinity;
    }
  }
}
