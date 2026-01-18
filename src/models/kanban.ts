// src/models/kanban.ts

export type Priority = "High" | "Medium" | "Low";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}
