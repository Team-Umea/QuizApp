import { IoMdCheckmark } from "react-icons/io";
import OptionCard from "./OptionCard";
import OutlineBtn from "../btn/OutlineBtn";

const OPTION_COLORS = ["#02c228", "#05c8eb", "#cf6006", "#cf0606"];

export default function QuizForm() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium p-4 bg-gray-800 text-gray-200">
        Start building your perfect quiz by adding engaging questions, customizing answer choices,
        and setting the correct responses with ease. Whether it’s for fun, learning, or testing
        knowledge, create an interactive experience that keeps your audience hooked! 🚀
      </h2>
      <div className="w-full h-full p-8 bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-200">Add a new Question</h3>
        <form className="flex flex-col justify-between w-full h-full pb-8">
          <textarea
            placeholder="Enter question"
            className="mt-32 w-full h-100 p-4 rounded-md border-2 border-gray-200 outline-none resize-none"
          />
          <div className="flex flex-col gap-y-24">
            <div className="flex flex-col gap-y-8">
              <p className="my-4 text-gray-400">
                <IoMdCheckmark size={24} className="inline" /> - Options marked with a checkmark are
                the correct answers to the question
              </p>
              <div className="grid grid-cols-[repeat(2,1fr)] gap-4">
                {Array.from({ length: 4 }, (_, index) => {
                  return (
                    <OptionCard
                      index={index}
                      isCorrect={index === 0}
                      bgColor={OPTION_COLORS[index]}
                    />
                  );
                })}
              </div>
            </div>
            <OutlineBtn>
              <span className="text-xl font-semibold">Add question</span>
            </OutlineBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
