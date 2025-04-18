import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SERVER_URL } from "../../api/endpoints";

const HAS_PINGED_KEY = "quizAppHasPinged";

export default function ApiPinger({ children }) {
  const [loading, setLoading] = useState(
    !JSON.parse(sessionStorage.getItem(HAS_PINGED_KEY) || "false")
  );
  const [error, setError] = useState(null);

  const pingApi = async () => {
    try {
      const response = await fetch(SERVER_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      sessionStorage.setItem(HAS_PINGED_KEY, true);
    } catch (err) {
      setError(err);
      setTimeout(pingApi, 2000);
    }
  };

  useEffect(() => {
    pingApi();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <Skeleton height={"100%"} width={"100%"} count={1} className="bg-gray-200!" />
        <p className="text-2xl font-medium absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Application is loading
        </p>
      </div>
    );
  }

  if (error) {
    return <div>Error loading application: {error.message}</div>;
  }

  return <>{children}</>;
}
