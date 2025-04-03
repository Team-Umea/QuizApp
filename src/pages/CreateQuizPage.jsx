import QuizList from "../components/create-quiz/QuizList";
import QuizForm from "../components/create-quiz/QuizForm";
import { QuestionProvider } from "../context/CreateQuizContext";

export default function CreateQuizPage() {
  return (
    <QuestionProvider>
      <div className="flex flex-col-reverse lg:grid grid-cols-[400px_auto] gap-4 p-4">
        <QuizList />
        <QuizForm />
      </div>
    </QuestionProvider>
  );
}
