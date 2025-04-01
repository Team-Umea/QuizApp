import React from "react";
import { NavLink, useNavigate } from "react-router";
import PrimaryBtn from "../../components/btn/PrimaryBtn";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="px-8 py-4 bg-black text-white font-semibold flex justify-between items-center">
      <NavLink to="/" className="text-xl">
        Quiz App
      </NavLink>
      <div>
        <PrimaryBtn onClick={() => navigate("/signin")}>
          <span>Sign in</span>
        </PrimaryBtn>
      </div>
    </nav>
  );
}
