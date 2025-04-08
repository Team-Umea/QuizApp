import React from "react";
import { OPTION_COLORS } from "../create-quiz/QuizForm";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";

export default function PlayQuizForm({ options }) {
  const { sendMessage } = usePlayQuizStore();

  const onSubmit = (e) => {
    e.preventDefault();
    const selectedValue = e.nativeEvent.submitter.value;
    sendMessage({ type: "ANSWER_QUESTION", answer: selectedValue });
    console.log("Selected value:", selectedValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <ul className="grid grid-cols-1fr md:grid-cols-[1fr_1fr] gap-8 p-8 mt-32">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <button
                type="submit"
                value={index}
                style={{
                  backgroundColor: OPTION_COLORS[index],
                  boxShadow: "inset 0 0 20px 10px rgba(0, 0, 0, 0.5)",
                }}
                className="min-h-36 h-full w-full rounded-xl transition-all duration-300 ease hover:opacity-70 cursor-pointer">
                <p className="text-xl text-black font-medium">{option}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
