import React from "react";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";

export default function PlayQuizWebSocketProvider({ children }) {
  usePlayQuizStore("ws://localhost:3009");
  return <>{children}</>;
}
