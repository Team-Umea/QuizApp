import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

export default function OptionCard({ index, bgColor }) {
  const { register, watch, getValues, setValue } = useFormContext();
  const [isAnswer, setIsAnswer] = useState(getValues("answers").includes(index));

  const answers = watch("answers");

  useEffect(() => {
    setIsAnswer(getValues("answers").includes(index));
  }, [getValues()]);

  const toggleIsAnswer = () => {
    setIsAnswer((prev) => !prev);

    if (isAnswer) {
      const filteredAnswers = [...answers].filter((answer) => answer !== index);
      setValue("answers", filteredAnswers);
    } else {
      const updatedAnswers = [...new Set([...answers, index])];
      setValue("answers", updatedAnswers);
    }
  };

  return (
    <div
      style={{ backgroundColor: bgColor, boxShadow: "inset 0 0 20px 10px rgba(0, 0, 0, 0.5)" }}
      className="flex flex-col gap-y-4 w-full h-full p-4 py-6 rounded-md">
      <div className="flex justify-between">
        <p className="text-lg font-medium text-gray-200">
          Option {index + 1} {index > 1 ? "(optional)" : ""}.
        </p>
        <button type="button" onClick={toggleIsAnswer} className="cursor-pointer">
          {isAnswer ? <IoMdCheckmark size={24} /> : <FaRegCircle size={24} />}
        </button>
      </div>
      <input
        type="text"
        {...register(`options.${index}`)}
        maxLength={50}
        placeholder={`Enter option ${index + 1}`}
        className="p-2 rounded-md border-2 border-gray-200 outline-none"
      />
    </div>
  );
}
