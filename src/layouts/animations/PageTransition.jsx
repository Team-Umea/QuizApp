import { motion } from "framer-motion";
import { useLocation } from "react-router";

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
