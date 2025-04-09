import { useNavigate } from "react-router";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import OutlineBtn from "../btn/OutlineBtn";
import { IoHomeOutline } from "react-icons/io5";

export default function QuizResult() {
  const navigate = useNavigate();
  const { quizResult, username, updateQuizResult } = usePlayQuizStore();

  const handleCloseResult = () => {
    updateQuizResult(null);
    navigate("/");
  };

  const hasResults = quizResult && quizResult.length > 0;

  if (!hasResults) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-y-12">
      <h3 className="text-xl mt-8">Quiz has ended. Thanks for playing!</h3>
      <OutlineBtn onClick={handleCloseResult} fullWidth={false}>
        <IoHomeOutline size={24} />
        <span>Go to start</span>
      </OutlineBtn>
      <ul className="w-[90%] max-w-[1000px] border-[1px]">
        {quizResult.map((result, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-[repeat(3,1fr)] py-4 ${
                index < result.length - 1 ? "border-b-[1px]" : ""
              } ${result.username === username ? "bg-green-700" : ""}`}>
              <p className="text-center">{index + 1}.</p>
              <p className="border-x-[1px] text-center">{result.username}</p>
              <p className="text-center">{result.score}p</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
