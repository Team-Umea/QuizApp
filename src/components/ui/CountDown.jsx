import { useEffect, useState } from "react";

export default function CountDown({ initialTime }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  return <>{time}</>;
}
