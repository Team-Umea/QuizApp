import usePlayQuizStore from "../../hooks/usePlayQuizStore";

export default function QuizResult() {
  const { quizResult, username } = usePlayQuizStore();

  return (
    <div className="flex flex-col items-center gap-y-12">
      <h3 className="text-xl mt-8">Results</h3>
      <ul className="w-[90%] max-w-[1000px] border-[1px]">
        {quizResult.map((result, index) => {
          return (
            <div
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
