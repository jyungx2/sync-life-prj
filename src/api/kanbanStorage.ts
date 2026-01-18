// src/api/kanbanStorage.ts
import type { Task } from "@/models/kanban";

const STORAGE_KEY = "kanban-tasks";

export const getAllTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("태스크 불러오기 실패:", error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("태스크 저장 실패:", error);
  }
};

export const addTask = (task: Task): boolean => {
  const tasks = getAllTasks();

  // 중복 체크
  if (tasks.some((t) => t.id === task.id)) {
    console.warn("이미 존재하는 태스크입니다.");
    return false;
  }

  const updatedTasks = [...tasks, task];
  saveTasks(updatedTasks);
  return true;
};

export const updateTask = (taskId: string, updates: Partial<Task>): boolean => {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    console.warn("존재하지 않는 태스크입니다.");
    return false;
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  saveTasks(tasks);
  return true;
};

export const removeTask = (taskId: string): boolean => {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((t) => t.id !== taskId);

  if (tasks.length === filteredTasks.length) {
    console.warn("존재하지 않는 태스크입니다.");
    return false;
  }

  saveTasks(filteredTasks);
  return true;
};

export const getTaskById = (taskId: string): Task | null => {
  const tasks = getAllTasks();
  return tasks.find((t) => t.id === taskId) || null;
};

export const clearAllTasks = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("태스크 초기화 실패:", error);
  }
};
