import React from "react";
import { OPTION_COLORS } from "../create-quiz/QuizForm";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";

export default function PlayQuizForm({ options = [], setHasAnswered }) {
  const { sendMessage } = usePlayQuizStore();

  const onClick = (option) => {
    sendMessage({ type: "ANSWER_QUESTION", answer: option });
    setHasAnswered(true);
  };

  return (
    <ul className="grid grid-cols-1fr md:grid-cols-[1fr_1fr] gap-8 p-8 md:mt-32">
      {options.map((option, index) => {
        return (
          <li key={index}>
            <button
              type="button"
              onClick={() => onClick(option)}
              style={{
                backgroundColor: OPTION_COLORS[index],
                boxShadow: "inset 0 0 20px 10px rgba(0, 0, 0, 0.5)",
              }}
              className="min-h-36 h-full w-full rounded-xl transition-all duration-300 ease hover:opacity-70 cursor-pointer">
              <p className="w-[90%] mx-auto text-xl text-black text-center font-medium">{option}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
