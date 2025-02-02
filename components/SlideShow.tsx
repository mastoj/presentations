"use client";

import { AnimatePresence } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Slide } from "./Slide";

interface SlideShowProps {
  slides: string[];
  initialSlide: number;
}

export function SlideShow({ slides, initialSlide }: SlideShowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialSlide);
  const [direction, setDirection] = useState(0);
  const slideRef = useRef<{ triggerNextAnimation: () => boolean } | null>(null);

  useEffect(() => {
    const slide = searchParams.get("slide");
    if (slide) {
      const slideNumber = Number.parseInt(slide, 10);
      if (
        !isNaN(slideNumber) &&
        slideNumber >= 0 &&
        slideNumber < slides.length
      ) {
        setCurrentPage(slideNumber);
      }
    }
  }, [searchParams, slides.length]);

  const paginate = useCallback(
    (newDirection: number) => {
      const newPage = currentPage + newDirection;
      if (newPage >= 0 && newPage < slides.length) {
        setCurrentPage(newPage);
        setDirection(newDirection);
        router.push(`?slide=${newPage}`, { scroll: false });
      }
    },
    [currentPage, router, slides.length]
  );

  const handleSlideComplete = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const handleNextAnimation = useCallback(() => {
    if (slideRef.current) {
      const hasMoreAnimations = slideRef.current.triggerNextAnimation();
      if (!hasMoreAnimations) {
        handleSlideComplete();
      }
    }
  }, [handleSlideComplete]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        handleNextAnimation();
      } else if (event.key === "ArrowLeft") {
        paginate(-1);
      }
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      handleNextAnimation();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [paginate, handleNextAnimation]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <Slide
          key={currentPage}
          content={slides[currentPage]}
          custom={direction}
          onComplete={handleSlideComplete}
          ref={slideRef}
        />
      </AnimatePresence>
    </div>
  );
}
