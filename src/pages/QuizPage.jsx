import React, { useEffect, useState } from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import PlayQuizForm from "../components/play-quiz/PlayQuizForm";
import { Outlet, useLocation } from "react-router";
import { BounceLoader } from "react-spinners";

export default function QuizPage() {
  const location = useLocation();
  const { quizName, quizState, score, currentQuestion } = usePlayQuizStore();
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setHasAnswered(false);
  }, [currentQuestion]);

  const question = currentQuestion?.question;
  const options = currentQuestion?.options;

  const isSubPage = !location.pathname.endsWith("quiz") && !location.pathname.endsWith("quiz/");

  if (isSubPage) {
    return <Outlet />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-2 md:py-0 bg-slate-800">
        <span>
          {quizState?.questionIndex + 1} / {quizState?.numQuestions}
        </span>
        <h2 className="text-2xl text-fuchsia-400 px-8 py-4">{quizName}</h2>
        <span>{score}p</span>
      </div>
      {hasAnswered ? (
        <div className="flex flex-col justify-center items-center w-[90%] h-screen mx-auto gap-y-12">
          <h3 className="text-2xl text-center">Wating for other participants to answer</h3>
          <BounceLoader color="darkgrey" />
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center px-8 py-4 min-h-[300px] bg-slate-700">
            <h3 className="text-xl text-center">{question}</h3>
          </div>
          <PlayQuizForm options={options} setHasAnswered={setHasAnswered} />
        </div>
      )}
    </div>
  );
}
