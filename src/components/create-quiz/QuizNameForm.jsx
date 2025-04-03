import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { quizNameSchema } from "../../validations/quizName";
import OutlineBtn from "../btn/OutlineBtn";
import FormInputBox from "../form/FormInputBox";
import { useQuestionContext } from "../../context/CreateQuizContext";
import { useState } from "react";
import Toast from "../ui/Toast";

export default function QuizNameForm() {
  const { questionState, setQuestionState } = useQuestionContext();
  const [formMessage, setFormMessage] = useState("");
  const quizName = questionState.quizName;
  const formMethods = useForm({
    resolver: zodResolver(quizNameSchema),
    defaultValues: {
      quizName: "",
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = formMethods;

  const onSubmit = (data) => {
    setQuestionState((prev) => ({ ...prev, quizName: data.quizName }));

    setFormMessage("Quiz name updated successfully");

    reset({
      quizName: "",
    });
  };

  const error = errors?.quizName?.message;

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-800">
          <div className="flex flex-col justify-between">
            <Controller
              name="quizName"
              control={control}
              render={({ field }) => (
                <FormInputBox
                  label={`${quizName ? quizName : "Set quiz name"}`}
                  value={field.value}
                  placeholder="Update quiz name here"
                  minLength={3}
                  maxLength={50}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="ml-6 mb-6 mt-4">
              <OutlineBtn type="submit" fullWidth={false}>
                <span className="whitespace-nowrap">Update quiz name</span>
              </OutlineBtn>
            </div>
          </div>
          {error && <p className="px-6 text-red-500">{error}</p>}
        </form>
      </FormProvider>
      <Toast message={formMessage} show={!!formMessage} onClose={() => setFormMessage("")} />
    </>
  );
}
