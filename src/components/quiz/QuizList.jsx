import React, { useEffect } from "react";
import useQuizStore from "../../hooks/useQuizStore";
import Loader from "../ui/Loader";
import DefaultBtn from "../btn/DefaultBtn";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "../btn/DeleteBtn";
import { useMutation } from "@tanstack/react-query";
import { deleteQuiz } from "../../api/api";
import { useNavigate } from "react-router";

export default function QuizList() {
  const navigate = useNavigate();
  const { quizes, loading } = useQuizStore();
  const { fetchQuizes } = useQuizStore();

  const deleteQuizMutation = useMutation({
    mutationFn: deleteQuiz,
    onSettled: () => {
      fetchQuizes();
    },
  });

  const navigateToEditQuiz = (quiz) => {
    const quizAsPath = encodeURIComponent(JSON.stringify(quiz));
    const path = `createquiz/${quizAsPath}`;
    navigate(path);
  };

  if (loading) {
    return <Loader />;
  }

  const hasQuizes = quizes && quizes.length > 0;

  return (
    <div className="px-4 my-18">
      <h2 className="text-2xl font-semibold">
        {hasQuizes ? (
          <span>Your quizzes</span>
        ) : (
          <span className="text-red-500">No quizzes added</span>
        )}
      </h2>
      <ul className="flex flex-col gap-y-8 p-8">
        {quizes.map((quiz) => {
          return (
            <li
              key={quiz._id}
              className="flex flex-col md:flex-row justify-between gap-y-4 p-8 rounded-lg bg-slate-700">
              <p className="text-xl font-medium text-gray-200">{quiz.quizName}</p>
              <div className="flex items-center gap-x-2 md:gap-x-6">
                <DefaultBtn onClick={() => navigateToEditQuiz(quiz)}>
                  <FaRegEdit size={24} />
                </DefaultBtn>
                <DeleteBtn onDelete={() => deleteQuizMutation.mutate(quiz._id)} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
