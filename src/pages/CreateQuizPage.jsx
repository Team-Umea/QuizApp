import QuizList from "../components/create-quiz/QuizList";
import QuizForm from "../components/create-quiz/QuizForm";
import { useParams } from "react-router";
import useCreateQuizStore from "../hooks/useCreateQuizStore";
import { useEffect } from "react";
import useQuizStore from "../hooks/useQuizStore";

export default function CreateQuizPage() {
  const { quizid: quizId } = useParams();
  const { quizes, updateQuiz, updateQuizes } = useCreateQuizStore();
  const { quizes: currentQuizes, getQuiz, fetchQuizes } = useQuizStore();

  useEffect(() => {
    fetchQuizes();
  }, []);

  useEffect(() => {
    updateQuizes(currentQuizes);
  }, [currentQuizes]);

  useEffect(() => {
    const newQuiz = getQuiz(quizId);
    updateQuiz(newQuiz);
  }, [quizes]);

  return (
    <div className="flex flex-col-reverse lg:grid grid-cols-[400px_auto] gap-4 p-4">
      <QuizList />
      <QuizForm />
    </div>
  );
}
