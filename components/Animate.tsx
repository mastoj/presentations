"use client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type React from "react";
import { useEffect } from "react";
import { useSlide } from "./slide2";

interface AnimateProps {
  children: React.ReactNode;
  isVisible: boolean;
  number: number;
}

export const Animate = ({ children, number }: AnimateProps) => {
  const { reportAnimationNumber, step } = useSlide();
  const isVisible = step >= number;
  useEffect(() => {
    reportAnimationNumber(number);
  }, [number, reportAnimationNumber]);
  return (
    <div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
