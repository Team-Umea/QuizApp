import React from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import PlayQuizForm from "../components/play-quiz/PlayQuizForm";

export default function QuizPage() {
  const { quizName, currentQuestion } = usePlayQuizStore();

  console.log("Curren q: ", currentQuestion);

  const question = currentQuestion.question;
  const options = currentQuestion.options;

  return (
    <div>
      <div className="flex justify-center items-center bg-slate-800">
        <h2 className="text-2xl text-fuchsia-400 px-8 py-4">{quizName}</h2>
      </div>
      <div className="flex justify-center items-center px-8 py-4 min-h-[300px] bg-slate-700">
        <h3 className="text-xl">{question}</h3>
      </div>
      <PlayQuizForm options={options} />
    </div>
  );
}
