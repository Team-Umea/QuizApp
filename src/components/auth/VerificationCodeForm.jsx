import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../form/FormInput";

export default function VerificationCodeForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col my-8 w-full">
      <p className="pl-4 text-lg text-gray-500 font-medium">
        En verifieringskod har skickats till din e-postadress
      </p>
      <Controller
        name="verificationCode.verificationCode"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Verifieringskod"
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
