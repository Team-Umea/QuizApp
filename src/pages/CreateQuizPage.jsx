import React from "react";
import QuizFormProvider from "../components/create-quiz/QuizFormProvider";
import QuizList from "../components/create-quiz/QuizList";
import QuizForm from "../components/create-quiz/QuizForm";

export default function CreateQuizPage() {
  return (
    <QuizFormProvider>
      <div className="flex gap-4 p-4 h-screen">
        <QuizList />
        <QuizForm />
      </div>
    </QuizFormProvider>
  );
}
