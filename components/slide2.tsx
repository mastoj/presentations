"use client";
import { PropsWithChildren } from "react";

type Props = {
  nextSlide: () => void;
};

const Slide2 = ({ nextSlide, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      {children}
      <button onClick={nextSlide}>Click me</button>
    </div>
  );
};

export default Slide2;
