// src/components/kanban/TaskModal.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TaskFormData {
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "todo" | "in-progress" | "done";
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  initialData?: TaskFormData | null;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      status: "todo",
    },
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // 수정 모드: 기존 데이터로 초기화
        reset(initialData);
      }
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: TaskFormData) => {
    onSave({
      ...data,
      description: data.description?.trim() || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[2rem]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[1.2rem] w-full max-w-[56rem] shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-[3.2rem]">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-[2.4rem]">
            <h2 className="text-[2.4rem] font-bold text-grey-90">
              {initialData ? "태스크 수정" : "새 태스크 추가"}
            </h2>
            <button
              onClick={onClose}
              className="text-grey-60 hover:text-grey-90 transition-colors"
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[2.4rem] w-[2.4rem]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 제목 */}
            <div className="mb-[2.4rem]">
              <label className="block text-[1.6rem] font-semibold text-grey-90 mb-[0.8rem]">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "제목을 입력해주세요",
                  validate: (value) =>
                    value.trim() !== "" || "제목을 입력해주세요",
                })}
                className="w-full px-[1.6rem] py-[1.2rem] border border-grey-40 rounded-[0.8rem] 
                         text-[1.6rem] focus:outline-none focus:border-orange-500 focus:ring-2 
                         focus:ring-orange-500 focus:ring-opacity-20 transition-all"
                placeholder="태스크 제목을 입력하세요"
              />
              {errors.title && (
                <p className="text-red-500 text-[1.4rem] mt-[0.4rem]">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* 설명 */}
            <div className="mb-[2.4rem]">
              <label className="block text-[1.6rem] font-semibold text-grey-90 mb-[0.8rem]">
                설명
              </label>
              <textarea
                {...register("description")}
                className="w-full px-[1.6rem] py-[1.2rem] border border-grey-40 rounded-[0.8rem] 
                         text-[1.6rem] focus:outline-none focus:border-orange-500 focus:ring-2 
                         focus:ring-orange-500 focus:ring-opacity-20 transition-all resize-none"
                placeholder="태스크 설명을 입력하세요 (선택)"
                rows={4}
              />
            </div>

            {/* 우선순위 */}
            <div className="mb-[2.4rem]">
              <label className="block text-[1.6rem] font-semibold text-grey-90 mb-[1.2rem]">
                우선순위 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-[1.2rem]">
                {(["High", "Medium", "Low"] as const).map((p) => (
                  <label
                    key={p}
                    className="choice type_radio flex-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={p}
                      {...register("priority")}
                      className="checkboxCustom"
                    />
                    <span className="text-[1.4rem] font-medium text-grey-90">
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 상태 */}
            <div className="mb-[3.2rem]">
              <label className="block text-[1.6rem] font-semibold text-grey-90 mb-[0.8rem]">
                상태
              </label>
              <select
                {...register("status")}
                className="w-full px-[1.6rem] py-[1.2rem] border border-grey-40 rounded-[0.8rem] 
                         text-[1.6rem] focus:outline-none focus:border-orange-500 focus:ring-2 
                         focus:ring-orange-500 focus:ring-opacity-20 transition-all cursor-pointer"
              >
                <option value="todo">할 일</option>
                <option value="in-progress">진행 중</option>
                <option value="done">완료</option>
              </select>
            </div>

            {/* 버튼 */}
            <div className="flex gap-[1.2rem] justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.6rem] font-semibold 
                         text-grey-70 bg-grey-20 hover:bg-grey-30 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.6rem] font-semibold 
                         text-white bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                {initialData ? "수정" : "추가"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
