import { createContext, useContext, useState } from "react";

const initialState = {
  questions: [],
  editingQuestion: null,
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
