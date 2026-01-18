// src/components/kanban/KanbanBoard.tsx
import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import TaskModal from "@/components/task/TaskModal";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export default function KanbanBoard({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: KanbanBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 상태별로 태스크 필터링
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  // 태스크 추가 버튼 클릭
  const handleAddClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // 태스크 편집
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 태스크 삭제
  const handleDeleteTask = (id: string) => {
    if (window.confirm("정말 이 태스크를 삭제하시겠습니까?")) {
      onDeleteTask(id);
    }
  };

  // 모달에서 저장
  const handleSaveTask = (data: {
    title: string;
    description?: string;
    priority: "High" | "Medium" | "Low";
    status: "todo" | "in-progress" | "done";
  }) => {
    if (editingTask) {
      // 수정
      onUpdateTask(editingTask.id, data);
    } else {
      // 추가
      onAddTask(data);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="mb-[3.2rem]">
        <div className="flex items-center justify-between mb-[2rem]">
          <div className="flex gap-6 items-center">
            <h1 className="text-[3.6rem] font-bold text-grey-90 mb-[0.8rem]">
              칸반보드
            </h1>
            <p className="text-[1.6rem] text-grey-70">
              태스크를 관리하고 프로젝트 진행 상황을 추적하세요
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-[0.8rem] px-[2.6rem] py-[1.2rem] 
                     bg-orange-500 text-white rounded-[0.8rem] text-[1.6rem] font-semibold 
                     hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[2rem] w-[2rem]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 태스크
          </button>
        </div>

        {/* 통계 */}
        <div className="flex gap-[1.6rem]">
          <div className="bg-white rounded-[0.8rem] px-[2rem] py-[1.6rem] shadow-sm">
            <p className="text-[1.4rem] text-grey-60 mb-[0.4rem]">전체</p>
            <p className="text-[2.8rem] font-bold text-grey-90">
              {tasks.length}
            </p>
          </div>
          <div className="bg-white rounded-[0.8rem] px-[2rem] py-[1.6rem] shadow-sm">
            <p className="text-[1.4rem] text-grey-60 mb-[0.4rem]">할 일</p>
            <p className="text-[2.8rem] font-bold text-blue-600">
              {todoTasks.length}
            </p>
          </div>
          <div className="bg-white rounded-[0.8rem] px-[2rem] py-[1.6rem] shadow-sm">
            <p className="text-[1.4rem] text-grey-60 mb-[0.4rem]">진행 중</p>
            <p className="text-[2.8rem] font-bold text-yellow-600">
              {inProgressTasks.length}
            </p>
          </div>
          <div className="bg-white rounded-[0.8rem] px-[2rem] py-[1.6rem] shadow-sm">
            <p className="text-[1.4rem] text-grey-60 mb-[0.4rem]">완료</p>
            <p className="text-[2.8rem] font-bold text-green-600">
              {doneTasks.length}
            </p>
          </div>
        </div>
      </div>

      {/* 칸반 컬럼들 */}
      <div className="flex gap-[2.4rem] overflow-x-auto pb-[2rem] flex-1">
        <KanbanColumn
          title="할 일"
          status="todo"
          tasks={todoTasks}
          onTaskEdit={handleEditTask}
          onTaskDelete={handleDeleteTask}
        />
        <KanbanColumn
          title="진행 중"
          status="in-progress"
          tasks={inProgressTasks}
          onTaskEdit={handleEditTask}
          onTaskDelete={handleDeleteTask}
        />
        <KanbanColumn
          title="완료"
          status="done"
          tasks={doneTasks}
          onTaskEdit={handleEditTask}
          onTaskDelete={handleDeleteTask}
        />
      </div>

      {/* 모달 */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
}
