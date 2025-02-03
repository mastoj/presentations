"use client";
import { Slideshow } from "@/components/slide-show";
import Slide1 from "./_slides/slide1.mdx";
import Slide2 from "./_slides/slide2.mdx";
import Slide3 from "./_slides/slide3.mdx";

type SlideProps = {
  initialSlide: number;
};
export const ReactParisSlides = ({ initialSlide }: SlideProps) => {
  const slides = [Slide1, Slide2, Slide3];
  return (
    <div className="flex h-screen items-center">
      <Slideshow
        slides={slides}
        initialSlide={initialSlide}
        // className=""
      />
    </div>
  );
};
