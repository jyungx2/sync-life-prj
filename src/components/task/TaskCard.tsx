// src/components/task/TaskCard.tsx

import { Draggable } from "@hello-pangea/dnd";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const priorityColors = {
  High: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  Medium: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  Low: {
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
  },
};

export default function TaskCard({
  task,
  index,
  title,
  description,
  priority,
  createdAt,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const colors = priorityColors[priority];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-[0.8rem] border border-grey-30 p-[1.6rem] cursor-pointer
  transform-gpu will-change-transform
  ${
    snapshot.isDragging
      ? "shadow-lg transition-none"
      : "shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-150 ease-out"
  }
 // 평소에만 shadow transition
`}
          onClick={onEdit}
        >
          {/* 헤더: 제목 + 삭제 버튼 */}
          <div className="flex items-start justify-between gap-[0.8rem] mb-[1.2rem]">
            <h3 className="text-[1.6rem] font-semibold text-grey-90 flex-1 break-words leading-[1.4]">
              {title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="flex-shrink-0 text-grey-60 hover:text-red-500 transition-colors"
              aria-label="태스크 삭제"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[2rem] w-[2rem]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* 설명 */}
          {description && (
            <p className="text-[1.4rem] text-grey-70 mb-[1.2rem] line-clamp-2 leading-[1.5]">
              {description}
            </p>
          )}

          {/* 푸터: 우선순위 + 날짜 */}
          <div className="flex items-center justify-between gap-[0.8rem]">
            {/* 우선순위 배지 */}
            <span
              className={`inline-flex items-center gap-[0.6rem] px-[1rem] py-[0.4rem] 
                         rounded-full text-[1.2rem] font-medium ${colors.bg} ${colors.text}`}
            >
              <span
                className={`w-[0.6rem] h-[0.6rem] rounded-full ${colors.dot}`}
              ></span>
              {priority}
            </span>

            {/* 생성 날짜 */}
            <span className="text-[1.2rem] text-grey-60">{createdAt}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
