import { IoMdCheckmark } from "react-icons/io";
import OptionCard from "./OptionCard";
import OutlineBtn from "../btn/OutlineBtn";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormInputBox from "../form/FormInputBox";
import { useQuestionContext } from "../../context/CreateQuizContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { newQuizquestionSchema } from "../../validations/newQuizQuestions";

const OPTION_COLORS = ["#02c228", "#05c8eb", "#cf6006", "#cf0606"];

export default function QuizForm() {
  const formMethods = useForm({
    resolver: zodResolver(newQuizquestionSchema),
    defaultValues: {
      id: "1",
      question: "",
      options: [],
      answers: [0],
    },
  });
  const { control, getValues, handleSubmit } = formMethods;
  const { questionState, setQuestionState } = useQuestionContext();

  const onSubmit = (data) => {
    const cleanedData = {
      ...data,
      options: data.options.filter((opt) => opt),
      answers: Array.from({ length: 4 })
        .map((_, index) => (data.answers.some((ans) => ans === index) ? data.options[index] : null))
        .filter((ans) => ans),
    };
    console.log("Submited data", cleanedData);
  };

  const onError = (err) => {
    console.log("Form error; ", err);
    console.log("FormData: ", getValues());
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium p-4 bg-gray-800 text-gray-200">
        Start building your perfect quiz by adding engaging questions, customizing answer choices,
        and setting the correct responses with ease. Whether it’s for fun, learning, or testing
        knowledge, create an interactive experience that keeps your audience hooked! 🚀
      </h2>
      <div className="w-full h-full p-8 bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-200">Add a new Question</h3>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col justify-between w-full h-full pb-8">
            <div className="mt-32">
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <FormInputBox
                    label="Question"
                    type="textarea"
                    value={field.value}
                    placeholder="Enter question here"
                    minLength={10}
                    maxLength={200}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-y-24">
              <div className="flex flex-col gap-y-8">
                <p className="my-4 text-gray-400">
                  <IoMdCheckmark size={24} className="inline" /> - Options marked with a checkmark
                  are the correct answers to the question
                </p>
                <div className="grid grid-cols-[repeat(2,1fr)] gap-4">
                  {Array.from({ length: 4 }, (_, index) => {
                    return (
                      <OptionCard
                        key={OPTION_COLORS[index]}
                        index={index}
                        bgColor={OPTION_COLORS[index]}
                      />
                    );
                  })}
                </div>
              </div>
              <OutlineBtn type="submit">
                <span className="text-xl font-semibold">Add question</span>
              </OutlineBtn>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
