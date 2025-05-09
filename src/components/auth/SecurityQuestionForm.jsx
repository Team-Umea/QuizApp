import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../form/FormInput";

export default function SecurityQuestionForm({ securityQuestion }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col my-8 w-full">
      <div className="space-y-2">
        <p className="text-red-700 font-semibold">
          Answer your security question because the verification code provided is incorrect.
        </p>
        <p className="text-gray-300 font-semibold">{securityQuestion}</p>
      </div>
      <Controller
        name="questionAnswer.questionAnswer"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Security question"
            type="password"
            value={field.value}
            errorMessage={errors?.questionAnswer?.questionAnswer?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
