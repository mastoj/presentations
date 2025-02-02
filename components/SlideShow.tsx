"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slide } from "./Slide";

type SlideState = {
  remainingAnimations: Set<number>;
  registerAnimation: (name: number) => void;
  removeAnimation: (name: number) => void;
};

const SlideContext = createContext<SlideState>({
  remainingAnimations: new Set(),
  registerAnimation: () => {},
  removeAnimation: () => {},
});

interface SlideShowProps {
  slides: ReactNode[];
  initialSlide: number;
  className?: string;
}

export function SlideShow({ slides, initialSlide, className }: SlideShowProps) {
  const searchParams = useSearchParams();
  const [slideEnabled, setSlideEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialSlide);
  const [direction, setDirection] = useState(0);
  const slideRef = useRef<{ triggerNextAnimation: () => boolean } | null>(null);

  const [remainingAnimations, setRemainingAnimations] = useState<Set<number>>(
    new Set([])
  );
  const registerAnimation = (num: number) => {
    const newSet = new Set(remainingAnimations);
    newSet.add(num);
    console.log("==> stuff: ", num, newSet);
    setRemainingAnimations(newSet);
    setSlideEnabled(false);
  };
  const removeAnimation = (num: number) => {
    setRemainingAnimations((prevAnimations) => {
      const newSet = new Set(prevAnimations);
      newSet.delete(num);
      if (newSet.size == 0) {
        setSlideEnabled(true);
      }
      return newSet;
    });
  };

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
      if (
        newPage >= 0 &&
        newPage < slides.length &&
        (slideEnabled || newDirection < 0)
      ) {
        setCurrentPage(newPage);
        setDirection(newDirection);

        // Set slide query parameter to newPage
        const params = new URLSearchParams(searchParams.toString());
        params.set("slide", newPage.toString());
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
      }
    },
    [currentPage, searchParams, slideEnabled, slides.length]
  );

  // const handleToggleSlide = useCallback((v: boolean) => {
  //   setSlideEnabled(v);
  //   console.log("==> Enabling slide: ", v);
  //   // paginate(1);
  // }, []);

  // const handleNextAnimation = useCallback(() => {
  //   if (slideRef.current) {
  //     const hasMoreAnimations = slideRef.current.triggerNextAnimation();
  //     if (!hasMoreAnimations) {
  //       handleSlideComplete();
  //     }
  //   }
  // }, [handleSlideComplete]);

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
  }, [paginate]);

  return (
    <SlideContext
      value={{ remainingAnimations, removeAnimation, registerAnimation }}
    >
      <div
        className={cn("h-full w-full overflow-hidden bg-gray-100", className)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={currentPage}
            content={slides[currentPage]}
            custom={direction}
            // toggleSlide={handleToggleSlide}
            ref={slideRef}
          />
        </AnimatePresence>
      </div>
    </SlideContext>
  );
}

export const useSlide = () => {
  const context = useContext(SlideContext);
  console.log("==> Getting some context: ", context);
  if (!context) {
    throw new Error("useSlide must be used in a slide");
  }
  return context;
};
