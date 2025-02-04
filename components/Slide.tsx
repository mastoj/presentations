"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type SlideState = {
  step: number;
  reportAnimationNumber: (animationNumber: number) => void;
};

const SlideContext = createContext<SlideState>({
  step: 0,
  reportAnimationNumber: () => {},
});

type Props = {
  nextSlide: () => void;
  previousSlide: () => void;
};

const Slide = ({
  nextSlide,
  previousSlide,
  children,
}: PropsWithChildren<Props>) => {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  const reportAnimationNumber = (stepNumber: number) => {
    if (stepNumber > maxStep) {
      setMaxStep(stepNumber);
    }
  };
  useEffect(() => {
    const handleClick = () => {
      console.log("==> Handle click: ", step, maxStep);
      if (step < maxStep) {
        console.log("==> Set step: ", step + 1);
        setStep((prev) => prev + 1);
      } else {
        nextSlide();
      }
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        handleClick();
      }
      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  });
  return (
    <SlideContext value={{ step, reportAnimationNumber }}>
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
