import { MdDragIndicator } from "react-icons/md";

export default function QuizCard({ question, index }) {
  return (
    <div className="px-4 py-6 bg-gray-900 cursor-pointer">
      <div className="flex justify-between items-center">
        <p className="text-gray-200 font-semibold">{index}.</p>
        <MdDragIndicator className="cursor-grab" />
      </div>
      <p>{question.question}</p>
    </div>
  );
}
