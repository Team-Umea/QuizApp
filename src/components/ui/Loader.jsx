import React from "react";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader size={100} color="white" />
    </div>
  );
}
