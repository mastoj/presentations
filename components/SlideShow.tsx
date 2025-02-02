"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Slide } from "./Slide";

interface SlideShowProps {
  slides: ReactNode[];
  initialSlide: number;
  className?: string;
}

export function SlideShow({ slides, initialSlide, className }: SlideShowProps) {
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

        // Set slide query parameter to newPage
        const params = new URLSearchParams(searchParams.toString());
        params.set("slide", newPage.toString());
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
      }
    },
    [currentPage, searchParams, slides.length]
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
      event.preventDefault();
      if (event.key === "ArrowRight" || event.key === " ") {
        paginate(1);
        // handleNextAnimation();
      } else if (event.key === "ArrowLeft") {
        paginate(-1);
      }
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      paginate(1);
      // handleNextAnimation();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [paginate, handleNextAnimation]);

  return (
    <div className={cn("h-full w-full overflow-hidden bg-gray-100", className)}>
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
