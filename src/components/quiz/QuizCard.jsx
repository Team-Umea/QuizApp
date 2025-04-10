import React, { useState } from "react";
import DefaultBtn from "../btn/DefaultBtn";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "../btn/DeleteBtn";
import StatusBtn from "../btn/StatusBtn";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { deleteQuiz, toggleQuizVisibility } from "../../api/api";
import useQuizStore from "../../hooks/useQuizStore";
import { cancelQuiz, runQuiz } from "../../api/api";

export default function QuizCard({ quiz, onRunQuiz, onCancelQuiz }) {
  const navigate = useNavigate();
  const { fetchQuizes } = useQuizStore();
  const [isRunning, setIsRunning] = useState(quiz.isRunning ? quiz.isRunning : false);
  const [quizCode, setQuizCode] = useState(quiz.code ? quiz.code : null);

  const deleteQuizMutation = useMutation({
    mutationFn: deleteQuiz,
    onSettled: () => fetchQuizes(),
  });

  const runQuizMutation = useMutation({
    mutationFn: runQuiz,
    onSuccess: (data) => {
      const code = data.data.code;
      const quizName = data.data.quiz.quizName;

      setQuizCode(code);

      const modalBody = (
        <div className="flex flex-col gap-y-8 mt-4">
          <h2 className="text-2xl font-medium text-green-500 break-words">
            Quiz <span className="italic">{quizName}</span> started successfully
          </h2>
          <p className="text-lg text-gray-400">Share this code to allow user to play your quiz</p>
          <p className="text-xl font-semibold">{code}</p>
        </div>
      );

      onRunQuiz(modalBody);
    },
  });

  const cancelQuizMutation = useMutation({
    mutationFn: cancelQuiz,
    onSuccess: (data) => {
      const toastMessage = data.data.message;
      setQuizCode(null);
      onCancelQuiz(toastMessage);
    },
  });

  const toggleQuizVisibilityMutation = useMutation({
    mutationFn: toggleQuizVisibility,
    onSettled: () => fetchQuizes(),
  });

  const toggleQuizStatus = () => {
    if (isRunning) {
      cancelQuizMutation.mutate(quiz._id);
    } else {
      runQuizMutation.mutate(quiz._id);
    }

    setIsRunning((prev) => !prev);
  };

  const navigateToEditQuiz = () => {
    const quizAsPath = encodeURIComponent(JSON.stringify(quiz));
    const path = `createquiz/${quizAsPath}`;
    navigate(path);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4 p-8 rounded-lg bg-slate-700">
      <div className="flex md:flex-col items-start justify-between w-full md:w-auto">
        <p className="text-xl font-medium text-gray-200">{quiz.quizName}</p>
        <DefaultBtn onClick={() => toggleQuizVisibilityMutation.mutate(quiz._id)}>
          <span className="text-lg text-blue-200">
            {quiz.isPublic ? "Set private" : "Set public"}
          </span>
        </DefaultBtn>
      </div>
      <div className="flex justify-between w-full md:w-auto md:gap-x-22">
        <div className="flex items-center gap-x-10">
          {quizCode && <p className="text-xl text-green-500 font-semibold">{quizCode}</p>}
          <StatusBtn onClick={toggleQuizStatus} statusColor={isRunning ? "#e01010" : "#09b537"}>
            <span className="font-medium">{isRunning ? "Cancel quiz" : "Run quiz"}</span>
          </StatusBtn>
        </div>
        {!isRunning && (
          <div className="flex items-center gap-x-2 md:gap-x-6">
            <DefaultBtn onClick={navigateToEditQuiz}>
              <FaRegEdit size={24} />
            </DefaultBtn>
            <DeleteBtn onDelete={() => deleteQuizMutation.mutate(quiz._id)} />
          </div>
        )}
      </div>
    </div>
  );
}
