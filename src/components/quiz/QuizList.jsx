import { useState } from "react";
import useQuizStore from "../../hooks/useQuizStore";
import Loader from "../ui/Loader";
import QuizCard from "./QuizCard";
import Modal from "../ui/Modal";
import Toast from "../ui/Toast";

export default function QuizList() {
  const { quizes, loading } = useQuizStore();
  const [modalBody, setModalBody] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const onRunQuiz = (modal) => {
    setModalBody(modal);
  };

  const onCancelQuiz = (message) => {
    setToastMessage(message);
    setModalBody(null);
  };

  const hasQuizes = quizes && quizes.length > 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
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
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                onRunQuiz={onRunQuiz}
                onCancelQuiz={onCancelQuiz}
              />
            );
          })}
        </ul>
      </div>
      <Modal show={!!modalBody} onClose={() => setModalBody(null)}>
        {modalBody}
      </Modal>
      <Toast show={!!toastMessage} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}
