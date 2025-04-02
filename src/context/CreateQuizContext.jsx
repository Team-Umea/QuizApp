import { createContext, useContext, useState } from "react";

const questions = [
  {
    question: "What is Html?",
    options: ["a", "b", "c"],
    answer: 1,
  },
  {
    question: "What is Css?",
    options: ["a", "b", "c"],
    answer: 1,
  },
  {
    question: "What is Javascirpt?",
    options: ["a", "b", "c"],
    answer: 1,
  },
  {
    question: "What is Typescript?",
    options: ["a", "b", "c"],
    answer: 1,
  },
];

const initialState = {
  questions: questions,
};

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questionState, setQuestionState] = useState(initialState);

  return (
    <QuestionContext.Provider value={{ questionState, setQuestionState }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};
