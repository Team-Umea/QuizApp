import { useQuery } from "@tanstack/react-query";
import { getQuizResult } from "../../api/api";
import Loader from "../ui/Loader";
import { useNavigate, useParams } from "react-router";
import OutlineBtn from "../btn/OutlineBtn";
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

  if (!results || results.length === 0) {
    return (
      <div className="p-6">
        <OutlineBtn fullWidth={false} onClick={() => navigate("/admin")}>
          <IoIosArrowRoundBack size={24} />
          <span>Go back</span>
        </OutlineBtn>
        <h2 className="p-4 text-xl font-medium text-gray-200">
          No results for this quiz registered
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="p-4 self-start">
        <OutlineBtn fullWidth={false} onClick={() => navigate("/admin")}>
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
                index < results.length - 1 ? "border-b-[1px]" : ""
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
