import React from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import PlayQuizForm from "../components/play-quiz/PlayQuizForm";

export default function QuizPage() {
  const { quizName, quizState, score, currentQuestion } = usePlayQuizStore();

  const question = currentQuestion.question;
  const options = currentQuestion.options;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-2 md:py-0 bg-slate-800">
        <span>
          {quizState?.questionIndex + 1} / {quizState?.numQuestions}
        </span>
        <h2 className="text-2xl text-fuchsia-400 px-8 py-4">{quizName}</h2>
        <span>{score}</span>
      </div>
      <div className="flex justify-center items-center px-8 py-4 min-h-[300px] bg-slate-700">
        <h3 className="text-xl">{question}</h3>
      </div>
      <PlayQuizForm options={options} />
    </div>
  );
}
