import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Fact {
  text: string;
}

interface LoadingPageAnimationProps {
  factsFile: string;
  onLoadingComplete?: () => void;
}

const LoadingPageAnimation: React.FC<LoadingPageAnimationProps> = ({
  factsFile,
  onLoadingComplete,
}) => {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);
  const minimumLoadingTime = 15000; // 15 seconds
  const textDuration = 5; // Duration each text is shown

  useEffect(() => {
    fetch(factsFile)
      .then((response) => response.json())
      .then((data) => setFacts(data.facts))
      .catch((error) => console.error("Error fetching facts:", error));
  }, [factsFile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, textDuration * 1000); // Change fact every textDuration seconds

    return () => clearInterval(interval);
  }, [facts.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (loadingTime >= minimumLoadingTime && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loadingTime, minimumLoadingTime, onLoadingComplete]);

  if (facts.length === 0) {
    return null;
  }

  const text = "Analyzing";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#eb8c00] mb-4 flex items-center justify-center">
          {text}
          <motion.div
            className="inline-block ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.span
              className="dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              .
            </motion.span>
            <motion.span
              className="dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              .
            </motion.span>
            <motion.span
              className="dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              .
            </motion.span>
          </motion.div>
        </h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFactIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-gray-700"
          >
            {facts[currentFactIndex].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingPageAnimation;
