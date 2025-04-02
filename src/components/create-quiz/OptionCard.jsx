import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";

export default function OptionCard({ index, isCorrect, setAnswer, bgColor }) {
  const [isAnswer, setIsAnswer] = useState(isCorrect ? true : false);

  const toggleIsAnswer = () => {
    setIsAnswer((prev) => !prev);
    setAnswer();
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
        placeholder={`Enter option ${index + 1}`}
        className="p-2 rounded-lg border-2 border-gray-200 outline-none"
      />
    </div>
  );
}
