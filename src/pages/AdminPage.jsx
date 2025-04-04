import React, { useEffect } from "react";
import OutlineBtn from "../components/btn/OutlineBtn";
import { Outlet, useLocation, useNavigate } from "react-router";
import useQuizStore from "../hooks/useQuizStore";
import QuizList from "../components/quiz/QuizList";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchQuizes } = useQuizStore();

  useEffect(() => {
    fetchQuizes();
  }, []);

  const isAdminPage = location.pathname.endsWith("admin") || location.pathname.endsWith("admin/");

  if (!isAdminPage) {
    return <Outlet />;
  }

  return (
    <div>
      <div className="px-4 py-6">
        <OutlineBtn onClick={() => navigate("createquiz")} fullWidth={false}>
          <span className="font-bold">Create Quiz</span>
        </OutlineBtn>
      </div>
      <QuizList />
    </div>
  );
}
