import React from "react";
import OutlineBtn from "../components/btn/OutlineBtn";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname.endsWith("admin") || location.pathname.endsWith("admin/");

  if (!isAdminPage) {
    return <Outlet />;
  }

  return (
    <div>
      <OutlineBtn onClick={() => navigate("createquiz")} fullWidth={false}>
        <span className="font-bold">Create Quiz</span>
      </OutlineBtn>
    </div>
  );
}
