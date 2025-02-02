"use client";
import { SlideShow } from "@/components/SlideShow";
import Slide1 from "./_slides/slide1.mdx";
import Slide2 from "./_slides/slide2.mdx";
import Slide3 from "./_slides/slide3.mdx";

type SlideProps = {
  initialSlide: number;
};
export const ReactParisSlides = ({ initialSlide }: SlideProps) => {
  return (
    <div className="flex h-screen items-center">
      <SlideShow
        slides={[<Slide1 key={1} />, <Slide2 key={2} />, <Slide3 key={3} />]}
        initialSlide={initialSlide}
        className=""
      />
    </div>
  );
};
