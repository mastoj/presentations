"use client";

import { AnimatePresence, motion } from "motion/react";
import { JSX, useState } from "react";
import Slide from "./slide";

export type SlideDefinition = () => JSX.Element;
interface SlideshowProps {
  slides: SlideDefinition[];
  initialSlide: number;
}

export function Slideshow({ slides, initialSlide }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(0);

  const doSlide = (direction: number) => {
    const newSlide = currentSlide + direction;
    setDirection(direction);
    setCurrentSlide(newSlide);
    window.history.pushState({}, "", `?slide=${newSlide}`);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      console.log("==> Next slide, currentSlide: ", currentSlide);
      doSlide(1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      console.log("==> Previous slide, currentSlide: ", currentSlide);
      doSlide(-1);
    }
  };

  return (
    <div
      className="h-full flex items-center justify-center overflow-hidden aspect-video mx-auto relative"
      tabIndex={0}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 4000 : -4000,
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => ({
              zIndex: 0,
              x: direction < 0 ? 4000 : -4000,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            ease: "easeInOut",
            // x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full h-full focus:outline-hidden focus-visible:outline-hidden absolute"
        >
          <Slide nextSlide={nextSlide} previousSlide={previousSlide}>
            {slides[currentSlide]()}
          </Slide>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
