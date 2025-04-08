import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryBtn from "../btn/PrimaryBtn";
import DefaultInput from "../form/DefaultInput";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { CODE_KEY, USERNAME_KEY } from "../../store/playQuizSlice";
import { useEffect } from "react";

const formSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username cannot be longer than 20 characters"),
  code: z.string().nonempty("Code is required"),
});

export default function JoinQuizForm() {
  const { code, sendMessage, updateUsername, updateCode } = usePlayQuizStore();
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: localStorage.getItem(USERNAME_KEY) || "",
      code: sessionStorage.getItem(CODE_KEY) || "",
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    updateUsername(data.username);
    updateCode(data.code);
    sendMessage({ type: "JOIN_QUIZ", code: data.code, username: data.username });
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 w-[90%] max-w-[500px] p-8 rounded-md bg-gray-900 text-gray-200">
        <h2 className="text-2xl text-fuchsia-500 font-medium">Join and Play!</h2>
        <DefaultInput
          name="username"
          label="Username"
          placeholder="Enter a username"
          minLength={3}
          maxLength={20}
        />
        <DefaultInput name="code" label="Quiz Code" placeholder="Enter a quiz code to join" />
        <div className="mt-8">
          <PrimaryBtn type="submit">
            <span className="font-medium">Join Quiz</span>
          </PrimaryBtn>
        </div>
      </form>
    </FormProvider>
  );
}
