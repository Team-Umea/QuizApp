import React, { useEffect } from "react";
import useQuizStore from "../../hooks/useQuizStore";

export default function QuizList() {
  const { quizes } = useQuizStore();

  useEffect(() => {
    console.log("Quizes: ", quizes);
  }, []);

  return <div></div>;
}
