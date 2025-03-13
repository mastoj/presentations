"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSlideshow } from "./slide-show-hooks";

type SlideState = {
  step: number;
  nextSlide: () => void;
  previousSlide: () => void;
  reportAnimationNumber: (animationNumber: number) => void;
};

const SlideContext = createContext<SlideState | undefined>(undefined);

const Slide = ({ children }: PropsWithChildren) => {
  const { previousSlide, nextSlide } = useSlideshow();
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  const reportAnimationNumber = (stepNumber: number) => {
    if (stepNumber > maxStep) {
      setMaxStep(stepNumber);
    }
  };
  useEffect(() => {
    const slidesDiv = document.querySelector(".slides");
    if (slidesDiv === null) {
      throw new Error("No slides div found");
    }
    const abortController = new AbortController();
    const handleClick = (direction: number) => {
      console.log("==> Handle click: ", step, maxStep, direction);
      if (step === 0 && direction === -1) {
        previousSlide();
      } else if (step < maxStep || (step === maxStep && direction === -1)) {
        console.log("==> Set step: ", step + direction);
        setStep((prev) => prev + direction);
      } else {
        nextSlide();
      }
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        handleClick(1);
      }
      if (event.key === "ArrowLeft") {
        console.log("==> Left click");
        handleClick(-1);
      }
    };

    const clickHandler = (e: MouseEvent) => {
      // If target element is link or button don't call handleClick
      const tagName = (e.target as HTMLElement).tagName.toLowerCase();
      if (tagName === "a" || tagName === "button") {
        return;
      }
      handleClick(1);
    };
    slidesDiv.addEventListener("click", clickHandler as EventListener, {
      signal: abortController.signal,
    });
    slidesDiv.addEventListener("keydown", handleKeydown as EventListener, {
      signal: abortController.signal,
    });
    return () => {
      abortController.abort();
    };
  });
  return (
    <SlideContext
      value={{
        step,
        reportAnimationNumber,
        nextSlide,
        previousSlide,
      }}
    >
      {children}
    </SlideContext>
  );
};

export const useSlide = () => {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error("useSlide must be used within a SlideContext");
  }
  return context;
};

export default Slide;
