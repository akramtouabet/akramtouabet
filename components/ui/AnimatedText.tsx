"use client";

import { motion } from "framer-motion";
import { useEffect, useState, ElementType, ReactNode, RefObject } from "react";

interface ViewportOptions {
    root?: RefObject<Element>;
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
}

type AnimatedTextProps = {
  children: ReactNode;
  as?: ElementType; // "h1", "p", "span", etc.
  className?: string;
  animationKey?: string | number; // optional stable key from parent
  viewport?: ViewportOptions;
};

export default function AnimatedText({
  children,
  as: Tag = "span",
  className = "",
  animationKey,
  viewport = {}
}: AnimatedTextProps) {
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    setDisplayedChildren(children);
  }, [children]);

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      key={animationKey ?? undefined}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className={className}
      viewport={viewport}
    >
      {displayedChildren}
    </MotionTag>
  );
}
