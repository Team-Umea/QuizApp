import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../form/FormInput";

export default function VerificationCodeForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col my-8 w-full">
      <p className="pl-4 text-lg text-gray-300 font-medium">
        A verification code has been sent to your email address.
      </p>
      <Controller
        name="verificationCode.verificationCode"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Verification code"
            type="password"
            value={field.value}
            errorMessage={errors?.verificationCode?.verificationCode?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
