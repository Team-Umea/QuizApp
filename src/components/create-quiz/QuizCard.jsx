import { MdDragIndicator } from "react-icons/md";
import { useQuestionContext } from "../../context/CreateQuizContext";

export default function QuizCard({ question, index }) {
  const { setQuestionState } = useQuestionContext();

  const editQuestion = () => {
    setQuestionState((prev) => ({ ...prev, editingQuestion: question }));
  };

  return (
    <button onClick={editQuestion} className="px-4 py-6 w-full bg-gray-900 cursor-pointer">
      <div className="flex justify-between items-center">
        <p className="text-gray-200 text-left font-semibold">{index}.</p>
        <MdDragIndicator className="cursor-grab" />
      </div>
      <p className="text-left">{question.question}</p>
    </button>
  );
}
