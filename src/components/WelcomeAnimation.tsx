import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeAnimationProps {
  onAnimationComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({
  onAnimationComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 4500); // Display welcome message for 4.5 seconds

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="welcome"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute flex items-center justify-center min-h-screen w-full bg-gray-100"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold text-[#eb8c00]"
          >
            Welcome to PwC AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-2xl font-semibold text-[#602320] mt-4"
          >
            Let's innovate together
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
