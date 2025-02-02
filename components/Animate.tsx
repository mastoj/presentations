"use client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type React from "react";
import { useEffect, useState } from "react";
import { useSlide } from "./SlideShow";

interface AnimateProps {
  children: React.ReactNode;
  isVisible: boolean;
  number: number;
}

export const Animate = ({ children, number }: AnimateProps) => {
  const { registerAnimation, removeAnimation } = useSlide();
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnimationNumber, setCurrentAnimationNumber] = useState(0);

  console.log("==> Animation: ", number);
  useEffect(() => {
    const setVisible = () => {
      const newNumber = currentAnimationNumber + 1;
      console.log("==> Current animation number: ", currentAnimationNumber);
      if (newNumber >= number) {
        setIsVisible(true);
        removeAnimation(1);
      }
      setCurrentAnimationNumber(newNumber);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "ArrowRight") {
        setVisible();
      }
    };

    const handleClick = () => {
      setVisible();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    console.log("==> Registering anumation: ", number);
    registerAnimation(number);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [currentAnimationNumber, number, registerAnimation, removeAnimation]);
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
