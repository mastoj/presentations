"use client";
import { useSlide } from "@/components/slide";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type React from "react";
import { useEffect } from "react";

export type AnimationType = "in" | "out";
export type AnimationEffect = "fade" | "slide";

interface AnimateProps {
  children: React.ReactNode;
  isVisible: boolean;
  number: number;
  delay?: number;
  animationType?: AnimationType[];
  animationEffect?: AnimationEffect;
}

const isVisible = (
  step: number,
  number: number,
  animationType: AnimationType[]
) => {
  if (animationType.length === 1 && animationType[0] === "in") {
    return step >= number;
  }
  if (animationType.length === 1 && animationType[0] === "out") {
    return step <= number;
  }
  return step === number;
};

const getAnimationEffect = (
  animationEffect: AnimationEffect,
  delay: number
) => {
  switch (animationEffect) {
    case "fade":
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5, delay },
      };
    case "slide":
      return {
        initial: { opacity: 0, x: 3000 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -3000 },
        transition: { duration: 0.5, delay },
      };
  }
};

export const Animate = ({
  children,
  number,
  delay = 0,
  animationType = ["in"],
  animationEffect = "slide",
}: AnimateProps) => {
  const { reportAnimationNumber, step } = useSlide();
  useEffect(() => {
    reportAnimationNumber(number);
    if (animationType.length === 2) {
      reportAnimationNumber(number + 1);
    }
  }, [number, reportAnimationNumber, animationType]);

  return (
    <AnimatePresence initial={false}>
      {isVisible(step, number, animationType) && (
        <motion.div {...getAnimationEffect(animationEffect, delay)}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
