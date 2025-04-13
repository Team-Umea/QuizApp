import { useQuery } from "@tanstack/react-query";
import { getQuizResult } from "../../api/api";
import Loader from "../ui/Loader";
import { useNavigate, useParams } from "react-router";
import OutlineBtn from "../btn/OutlineBtn";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function QuizScores() {
  const navigate = useNavigate();
  const { quizid: quizId } = useParams();
  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getQuizResult(quizId),
    queryKey: ["results"],
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2 className="p-4 text-xl font-medium text-red-500">{error.message}</h2>;
  }

  const results = quiz.result;

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="w-fit p-4 self-start">
        <OutlineBtn onClick={() => navigate("/admin")}>
          <IoIosArrowRoundBack size={24} />
          <span>Go back</span>
        </OutlineBtn>
      </div>
      <ul className="w-[90%] max-w-[1000px] border-[1px]">
        {results.map((result, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-[repeat(3,1fr)] py-4 ${
                index < result.length - 1 ? "border-b-[1px]" : ""
              }`}>
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
