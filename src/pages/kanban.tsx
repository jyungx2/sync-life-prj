// src/pages/kanban/index.tsx
import { useState } from "react";
import {
  getAllTasks,
  addTask,
  updateTask,
  removeTask,
} from "@/api/kanbanStorage";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import type { Task } from "@/models/kanban";

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(() => getAllTasks());

  // 태스크 추가
  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    // localStorage 저장
    const success = addTask(newTask);

    // React 상태 업데이트
    if (success) {
      setTasks((prev) => [...prev, newTask]);
    }
  };

  // 태스크 수정
  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    // localStorage 저장
    const success = updateTask(id, updates);

    // React 상태 업데이트
    if (success) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
      );
    }
  };

  // 태스크 삭제
  const handleDeleteTask = (id: string) => {
    // localStorage 저장
    const success = removeTask(id);

    // React 상태 업데이트
    if (success) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="mx-auto">
      <KanbanBoard
        tasks={tasks}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
