import React, { useEffect, useState } from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import JoinPublicQuizForm from "../components/play-quiz/JoinPublicQuizForm";
import { NavLink } from "react-router";
import SearchBar from "../components/ui/SearchBar";

export default function HomePage() {
  const { publicQuizes } = usePlayQuizStore();
  const [filteredQuizes, setFilteredQuizes] = useState(publicQuizes);

  useEffect(() => {
    setFilteredQuizes(publicQuizes);
  }, [publicQuizes]);

  const handleSeachQuizes = (query) => {
    const searchedQuizes = publicQuizes.filter((quiz) =>
      quiz.quizName.trim().toLowerCase().includes(query)
    );
    setFilteredQuizes(searchedQuizes);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex flex-col items-center p-2 w-full bg-gradient-to-r from-blue-600 to-fuchsia-700">
        <div className="flex flex-col justify-center items-center gap-y-6 w-full min-h-[300px] bg-gray-900">
          <h1 className="text-3xl text-center px-8 max-w-[80%] border-r-8 border-fuchsia-400">
            Welcome to Quizio
          </h1>
          <h2 className="text-center text-xl px-4 max-w-[80%] border-l-4 border-blue-400">
            Join the ultimate multiplayer quiz experience and challenge your friends!
          </h2>
          <NavLink
            to="/signin"
            className="text-center pb-2 max-w-[80%] border-b-[1px] border-blue-500 transition-all duration-300 ease transform hover:translate-y-[-4px]">
            <span className="text-blue-300">Create your own</span>&nbsp;
            <span className="text-fuchsia-500">quizzes by signing in</span>
          </NavLink>
        </div>
      </div>
      <div className="w-full px-4 py-6 my-12 bg-gray-900 border-b-2 border-fuchsia-500">
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-x-20 gap-y-4 px-14 md:p-0 md:max-w-[80%] lg:max-w-[60%] mx-auto">
          <h3 className="text-2xl text-blue-400 md:whitespace-nowrap">Public quizzes to play</h3>
          <SearchBar placeholder="Search by quiz name" onChange={handleSeachQuizes} />
        </div>
      </div>
      {publicQuizes.length === 0 ? (
        <h3 className="text-2xl text-gray-200 font-medium">No public quizzes available</h3>
      ) : (
        <>
          {filteredQuizes.length > 0 ? (
            <ul className="flex flex-col items-center gap-y-8 w-[90%] max-w-[800px]">
              {filteredQuizes.map((quiz) => {
                return <JoinPublicQuizForm key={quiz._id} quiz={quiz} />;
              })}
            </ul>
          ) : (
            <h3 className="text-2xl text-red-600 font-medium">No quiz found </h3>
          )}
        </>
      )}
    </div>
  );
}
