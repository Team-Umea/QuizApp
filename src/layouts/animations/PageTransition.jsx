import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    const currentBasePath = location.pathname.split("/").slice(0, -1).join("/");
    const prevBasePath = key.split("/").slice(0, -1).join("/");

    if (currentBasePath !== prevBasePath) {
      setKey(location.pathname);
    }
  }, [location.pathname, key]);

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
