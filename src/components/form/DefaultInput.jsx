import React from "react";
import { useFormContext } from "react-hook-form";

export default function DefaultInput({ name, label, placeholder, minLength, maxLength }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col gap-y-2">
      {label && <label className="text-lg font-medium">{label}</label>}
      <input
        {...register(name)}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete="off"
        spellCheck="false"
        className="p-2 rounded-md border-[1px] outline-none"
      />
      {error && <p className="font-medium text-red-500">{error}</p>}
    </div>
  );
}
