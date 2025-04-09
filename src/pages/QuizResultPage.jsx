import React from "react";
import QuizResult from "../components/play-quiz/QuizResult";
import usePlayQuizStore from "../hooks/usePlayQuizStore";

export default function QuizResultPage() {
  const { quizName } = usePlayQuizStore();

  return (
    <>
      <div className="flex justify-center items-center px-8 py-2 md:py-0 bg-slate-800">
        <h2 className="text-2xl text-fuchsia-400 px-8 py-4">{quizName}</h2>
      </div>
      <QuizResult />
    </>
  );
}
