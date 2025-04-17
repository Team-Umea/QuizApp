import { z } from "zod";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { USERNAME_KEY } from "../../store/playQuizSlice";
import DefaultInput from "../form/DefaultInput";
import PrimaryBtn from "../btn/PrimaryBtn";

const formSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username cannot be longer than 20 characters"),
});

export default function JoinPublicQuizForm({ quiz }) {
  const { error, sendMessage, updateUsername, updateCode, updateError } = usePlayQuizStore();
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: localStorage.getItem(USERNAME_KEY) || "",
    },
  });

  const { watch, handleSubmit } = formMethods;

  useEffect(() => {
    updateError(null);
  }, [JSON.stringify(watch())]);

  const onSubmit = (data) => {
    updateUsername(data.username);
    updateCode(quiz._id);
    sendMessage({ type: "JOIN_QUIZ", code: quiz._id, username: data.username });
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col items-center gap-y-8 p-8 rounded-md w-full bg-gray-900 text-gray-200">
        <h2 className="text-xl font-medium text-fuchsia-400">{quiz.quizName}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:grid md:grid-cols-[1fr_1fr] items-center md:items-end md:gap-y-8 w-full">
          <div className="flex flex-col gap-y-2 w-full">
            <DefaultInput
              name="username"
              label="Username"
              placeholder="Enter a username"
              minLength={3}
              maxLength={20}
            />
            {error && <p className="text-red-500 text-center md:text-left font-medium">{error}</p>}
          </div>
          <div className={`w-full md:w-fit justify-self-end ${!error ? "mt-8" : ""}`}>
            <PrimaryBtn type="submit">
              <span className="font-medium">Play Quiz</span>
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
