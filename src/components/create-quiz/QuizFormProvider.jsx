import { FormProvider, useForm } from "react-hook-form";

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

export default function QuizFormProvider({ children }) {
  const formMethods = useForm({
    defaultValues: {
      questions: questions,
    },
  });

  return (
    <FormProvider {...formMethods}>
      <>{children}</>
    </FormProvider>
  );
}
