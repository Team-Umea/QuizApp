import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../form/FormInput";

export default function PasswordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col my-8 w-full">
      <Controller
        name="password.password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Lösenord"
            type="password"
            value={field.value}
            errorMessage={errors?.password?.password?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
