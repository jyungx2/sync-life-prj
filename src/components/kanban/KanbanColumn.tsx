// src/components/kanban/KanbanColumn.tsx
import { Droppable } from "@hello-pangea/dnd";
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
  searchQuery: string;
  matchedTaskIds: Set<string> | null;
}

const columnStyles = {
  todo: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    header: "text-blue-900",
    badgeBg: "bg-white",
    badgeText: "text-blue-900",
  },
  "in-progress": {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    header: "text-yellow-900",
    badgeBg: "bg-white",
    badgeText: "text-yellow-900",
  },
  done: {
    bg: "bg-green-50",
    border: "border-green-200",
    header: "text-green-900",
    badgeBg: "bg-white",
    badgeText: "text-green-900",
  },
} as const;

// ✅ 드래그 오버 시: 컬럼 배경색의 “진한 테두리/링”
const highlightStyles = {
  todo: "border-blue-400 ring-blue-300 shadow-md",
  "in-progress": "border-yellow-400 ring-yellow-300 shadow-md",
  done: "border-green-400 ring-green-300 shadow-md",
} as const;

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
  searchQuery,
  matchedTaskIds,
}: KanbanColumnProps) {
  const isSearchActive = searchQuery.length > 0;
  const styles = columnStyles[status];

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => {
        const isOver = snapshot.isDraggingOver;

        return (
          <div className="flex-1 min-w-[32rem] max-w-[42rem]">
            {/* ✅ 컬럼 카드 박스: 전체 보더 하이라이트는 여기 */}
            <div
              className={`${styles.bg} border-2 rounded-[1.2rem] p-[2rem] h-full flex flex-col
                transition-[border-color,box-shadow] duration-150
                ${isOver ? `${highlightStyles[status]} ring-2` : styles.border}
              `}
            >
              {/* ✅ 헤더도 살짝 강조 */}
              <div className="flex items-center justify-between mb-[2rem]">
                <h2
                  className={`text-[2rem] font-bold ${styles.header} transition-opacity duration-150 ${
                    isOver ? "opacity-100" : "opacity-90"
                  }`}
                >
                  {title}
                </h2>

                {/* ✅ 배지도 드래그 오버 시 테두리 강조 */}
                <span
                  className={`${styles.badgeBg} ${styles.badgeText} rounded-full px-[1.2rem] py-[0.6rem]
                    text-[1.4rem] font-semibold shadow-sm border transition-colors duration-150
                    ${isOver ? "border-current" : "border-transparent"}
                  `}
                >
                  {tasks.length}
                </span>
              </div>

              {/* ✅ Droppable 영역: ref/props는 여기만 + gap으로 끊김 제거 */}
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  flex-1 min-h-[12rem] overflow-y-auto custom-scrollbar
                  rounded-[0.8rem]
                  flex flex-col gap-[1.2rem]
                  transition-colors duration-150
                  ${isOver ? "bg-white/30" : ""}
                `}
              >
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
                    <p className="text-[1.4rem] text-grey-60">
                      태스크가 없습니다
                    </p>
                  </div>
                ) : (
                  tasks.map((task, index) => {
                    const isMatched =
                      !isSearchActive ||
                      (matchedTaskIds ? matchedTaskIds.has(task.id) : true);
                    return (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        createdAt={formatDate(task.createdAt)}
                        onEdit={() => onTaskEdit(task)}
                        onDelete={() => onTaskDelete(task.id)}
                        isSearchActive={isSearchActive}
                        isMatched={isMatched}
                      />
                    );
                  })
                )}

                {provided.placeholder}
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}
