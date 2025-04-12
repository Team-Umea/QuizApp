import React, { useEffect, useState } from "react";
import DefaultBtn from "../btn/DefaultBtn";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "../btn/DeleteBtn";
import StatusBtn from "../btn/StatusBtn";
import OutlineBtn from "../btn/OutlineBtn";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { deleteQuiz, launchQuiz, toggleQuizVisibility } from "../../api/api";
import useQuizStore from "../../hooks/useQuizStore";
import { cancelQuiz, runQuiz } from "../../api/api";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { PiUsersThree } from "react-icons/pi";
import useConnectedPlayersStore from "../../hooks/useConnectedPlayersStore";

export default function QuizCard({ quiz, onRunQuiz, onCancelQuiz }) {
  const navigate = useNavigate();
  const { fetchQuizes } = useQuizStore();
  const { sendMessage } = usePlayQuizStore();
  const { connectedPlayers, resetState } = useConnectedPlayersStore();
  const [isRunning, setIsRunning] = useState(quiz.isRunning ? quiz.isRunning : false);
  const [quizCode, setQuizCode] = useState(quiz.code ? quiz.code : null);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    sendMessage({ type: "GET_PLAYERS", quizId: quiz._id });
  }, []);

  useEffect(() => {
    const quizPlayers =
      connectedPlayers && connectedPlayers[quiz._id] ? connectedPlayers[quiz._id].length : 0;
    setClients(quizPlayers);
  }, [connectedPlayers]);

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
    onSettled: () => fetchQuizes(),
  });

  const cancelQuizMutation = useMutation({
    mutationFn: cancelQuiz,
    onSuccess: (data) => {
      const toastMessage = data.data.message;
      setQuizCode(null);
      onCancelQuiz(toastMessage);
    },
    onSettled: () => {
      fetchQuizes();
      resetState();
    },
  });

  const toggleQuizVisibilityMutation = useMutation({
    mutationFn: toggleQuizVisibility,
    onSettled: () => fetchQuizes(),
  });

  const launchQuizMutation = useMutation({
    mutationFn: launchQuiz,
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
    <div className="p-8 rounded-lg bg-slate-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4">
        <div className="flex md:flex-col items-start justify-between w-full md:w-auto">
          <p className="text-xl font-medium text-gray-200">{quiz.quizName}</p>
          {!isRunning ? (
            <DefaultBtn onClick={() => toggleQuizVisibilityMutation.mutate(quiz._id)}>
              <span className="text-lg text-blue-200">
                {quiz.isPublic ? "Set private" : "Set public"}
              </span>
            </DefaultBtn>
          ) : (
            quizCode && <p className="text-xl text-green-500 font-semibold">{quizCode}</p>
          )}
        </div>
        {!quiz.isPublic && (
          <div className="flex justify-between w-full md:w-auto md:gap-x-22">
            <div className="flex flex-col md:flex-row items-center gap-x-10 gap-y-6 w-full md:w-auto mt-8 md:mt-0">
              <StatusBtn onClick={toggleQuizStatus} statusColor={isRunning ? "#e01010" : "#09b537"}>
                <span className="font-medium">{isRunning ? "Cancel" : "Run"}</span>
              </StatusBtn>
              {!quiz.isLaunched && isRunning && (
                <OutlineBtn onClick={() => launchQuizMutation.mutate(quiz._id)}>
                  <span className="font-medium">Launch</span>
                </OutlineBtn>
              )}
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
        )}
      </div>
      {quiz.isRunning && (
        <div className="flex justify-end items-center gap-x-2 mt-4">
          <p>{clients}</p>
          <PiUsersThree size={24} />
        </div>
      )}
    </div>
  );
}
