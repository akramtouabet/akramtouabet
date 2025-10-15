"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    setDisplayedText(text);
  }, [text]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={displayedText}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.15 }}
        className="inline-block"
      >
        {displayedText}
      </motion.span>
    </AnimatePresence>
  );
}
