import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import QuizCard from "./QuizCard";
import { useQuestionContext } from "../../context/CreateQuizContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { watchQuiz } from "../../api/api";

export default function QuizList() {
  const navigate = useNavigate();
  const { quiz } = useParams();
  const { questionState, setQuestionState } = useQuestionContext();

  useEffect(() => {
    const quizData = quiz ? JSON.parse(decodeURIComponent(quiz)) : null;
    if (quizData) {
      setQuestionState((prev) => ({
        ...prev,
        questions: quizData.questions,
        quizId: quizData._id,
        quizName: quizData.quizName,
      }));
    }
  }, []);

  const watchQuizMutation = useMutation({
    mutationFn: watchQuiz,
  });

  const questions = questionState.questions;

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = [...questions];
    const [movedItem] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedItem);

    setQuestionState((prev) => ({ ...prev, questions: reorderedQuestions }));

    watchQuizMutation.mutate({ ...questionState, questions: reorderedQuestions });

    const currentQuizDataPath = quiz ? JSON.parse(decodeURIComponent(quiz)) : null;
    const quizAsPath = encodeURIComponent(
      JSON.stringify({ ...currentQuizDataPath, questions: reorderedQuestions })
    );
    const path = `/admin/createquiz/${quizAsPath}`;
    navigate(path);
  };

  const hasQuestions = questions && questions.length > 0;

  return (
    <div className="w-full lg:w-[400px] lg:min-h-screen p-4 h-full bg-gray-800">
      <h4 className="p-4 text-lg font-semibold mb-8 bg-gradient-to-b from-blue-800 to-indigo-600 text-gray-200">
        {hasQuestions
          ? "Your questions are ready! Click on any question to edit its details, or simply drag and drop to rearrange the order and customize the flow of your quiz effortlessly."
          : "No questions yet! Start by adding your first question, then edit or rearrange them anytime to create the perfect quiz experience. 🚀"}
      </h4>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="quizList">
          {(provided) => (
            <ul
              className="flex flex-col gap-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <QuizCard question={question} index={index + 1} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
