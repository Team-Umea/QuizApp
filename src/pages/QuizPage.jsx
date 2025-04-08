import React from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";

export default function QuizPage() {
  const { currentQuestion } = usePlayQuizStore();

  console.log("Curren q: ", currentQuestion);

  return <div>{currentQuestion.question}</div>;
}
