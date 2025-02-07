import { createContext, useContext } from "react";

type SlideShowState = {
  currentSlide: number;
  numberOfSlides: number;
  previousSlide: () => void;
  nextSlide: () => void;
};

export const SlideShowContext = createContext<SlideShowState | undefined>(
  undefined
);

export const useSlideshow = () => {
  const context = useContext(SlideShowContext);
  if (context === undefined) {
    throw new Error("useSlideshow must be used within a SlideshowProvider");
  }
  return context;
};
