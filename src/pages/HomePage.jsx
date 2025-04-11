import React from "react";
import usePlayQuizStore from "../hooks/usePlayQuizStore";
import JoinPublicQuizForm from "../components/play-quiz/JoinPublicQuizForm";
import { NavLink } from "react-router";

export default function HomePage() {
  const { publicQuizes } = usePlayQuizStore();

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
      <h3 className="text-2xl my-12 text-gray-200">Public quizzes to play</h3>
      <ul className="flex flex-col items-center gap-y-8 w-[90%] max-w-[800px]">
        {publicQuizes.map((quiz) => {
          return <JoinPublicQuizForm key={quiz._id} quiz={quiz} />;
        })}
      </ul>
    </div>
  );
}
