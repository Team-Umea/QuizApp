import React from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import { BounceLoader } from "react-spinners";
import { OPTION_COLORS } from "../components/create-quiz/QuizForm";

export default function QuizLobbyPage() {
  const { quizName, players, quizStartDelay } = usePlayQuizStore();

  return (
    <div>
      <div className="flex justify-center items-center px-8 py-2 md:py-0 bg-slate-800">
        <h2 className="text-2xl text-fuchsia-400 px-8 py-4">{quizName}</h2>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-8 min-h-[300px] bg-slate-700">
        <h3 className="text-xl">
          {quizStartDelay ? "Quiz is starting in 3s" : "Wating for participants"}
        </h3>
        <BounceLoader color="darkgrey" />
      </div>
      <div className="flex flex-col gap-y-8 p-8">
        <h4 className="text-xl text-fuchsia-400 font-medium">Participants</h4>
        <ul className="flex flex-wrap gap-4 px-4">
          {players.map((player) => {
            return (
              <li
                key={player}
                style={{
                  backgroundColor: `${OPTION_COLORS[Math.floor(Math.random() * 4)]}`,
                  boxShadow: "inset 0 0 20px 10px rgba(0, 0, 0, 0.5)",
                }}
                className="flex justify-center items-center px-8 py-4 w-fit rounded-md text-lg font-medium">
                {player}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
