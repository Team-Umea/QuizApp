import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryBtn from "../btn/PrimaryBtn";
import DefaultInput from "../form/DefaultInput";

const formSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username cannot be longer than 20 characters"),
  code: z.string().nonempty("Code is required"),
});

export default function JoinQuizForm() {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", code: "" },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    console.log(data);

    //websocket
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
            <span>Join Quiz</span>
          </PrimaryBtn>
        </div>
      </form>
    </FormProvider>
  );
}
