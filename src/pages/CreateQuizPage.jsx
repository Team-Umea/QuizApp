import React from "react";
import QuizFormProvider from "../components/create-quiz/QuizFormProvider";
import QuizList from "../components/create-quiz/QuizList";

export default function CreateQuizPage() {
  return (
    <QuizFormProvider>
      <div className="h-screen">
        <QuizList />
      </div>
    </QuizFormProvider>
  );
}
