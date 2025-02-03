/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MDXProvider } from "@mdx-js/react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import Slide2 from "./slide2";

interface SlideProps {
  nextSlide: () => void;
}

type SlideComponent = React.ComponentType<SlideProps>;

interface MDXSlide {
  default: React.ComponentType;
}

type Slide = SlideComponent | MDXSlide;

interface SlideshowProps {
  slides: Slide[];
}

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-8" {...props} />,
  p: (props: any) => <p className="text-xl mb-4" {...props} />,
  ul: (props: any) => (
    <ul className="text-xl space-y-4 list-disc list-inside" {...props} />
  ),
  li: (props: any) => <li {...props} />,
};

export function Slideshow({ slides }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setDirection(-1);
      setCurrentSlide(0);
    } else {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === " ") {
      nextSlide();
    }
  };

  const renderSlide = (slide: Slide) => {
    console.log("==> Some slide: ", slide);
    if ("default" in slide) {
      // This is an MDX slide
      console.log("==> MDX SLIDE: ", slide);
      const MDXSlide = slide.default;
      return (
        <Slide2 nextSlide={nextSlide}>
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-yellow-100 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MDXProvider components={mdxComponents}>
              <MDXSlide />
            </MDXProvider>
          </div>
        </Slide2>
      );
    } else {
      // This is a TSX slide
      return (
        <Slide2 nextSlide={nextSlide}>
          {React.createElement(slide, { nextSlide })}
        </Slide2>
      );
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-gray-100"
      onClick={nextSlide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 1000 : -1000,
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => ({
              zIndex: 0,
              x: direction < 0 ? 1000 : -1000,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full h-full absolute"
        >
          {renderSlide(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
