// src/components/kanban/KanbanColumn.tsx

import TaskCard from "@/components/task/TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}

interface KanbanColumnProps {
  title: string;
  status: "todo" | "in-progress" | "done";
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (id: string) => void;
}

const columnStyles = {
  todo: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    header: "text-blue-900",
  },
  "in-progress": {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    header: "text-yellow-900",
  },
  done: {
    bg: "bg-green-50",
    border: "border-green-200",
    header: "text-green-900",
  },
};

// 날짜 포맷 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "오늘";
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function KanbanColumn({
  title,
  status,
  tasks,
  onTaskEdit,
  onTaskDelete,
}: KanbanColumnProps) {
  const styles = columnStyles[status];

  return (
    <div className="flex-1 min-w-[32rem] max-w-[42rem]">
      <div
        className={`${styles.bg} ${styles.border} border-2 rounded-[1.2rem] 
                   p-[2rem] h-full flex flex-col`}
      >
        {/* 컬럼 헤더 */}
        <div className="flex items-center justify-between mb-[2rem]">
          <h2 className={`text-[2rem] font-bold ${styles.header}`}>{title}</h2>
          <span
            className="bg-white text-grey-70 rounded-full px-[1.2rem] py-[0.6rem] 
                       text-[1.4rem] font-semibold shadow-sm"
          >
            {tasks.length}
          </span>
        </div>

        {/* 태스크 리스트 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-[1.2rem]">
          {tasks.length === 0 ? (
            <div className="text-center py-[4rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[4.8rem] w-[4.8rem] mx-auto mb-[1.2rem] text-grey-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-[1.4rem] text-grey-60">태스크가 없습니다</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                createdAt={formatDate(task.createdAt)}
                onEdit={() => onTaskEdit(task)}
                onDelete={() => onTaskDelete(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
