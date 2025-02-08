"use client";
import { SlideDefinition, Slideshow } from "@/components/slide-show";
import TitleSlide from "@/components/title-slide";
import background from "@/images/nextecom/homepage.png";
import { ComponentType, createElement } from "react";
import Slide1 from "./_slides/slide1.mdx";
import Slide2 from "./_slides/slide2.mdx";
import Slide3 from "./_slides/slide3.mdx";
import Slide4 from "./_slides/slide4.mdx";

type SlideProps = {
  initialSlide: number;
};
export const ReactParisSlides = ({ initialSlide }: SlideProps) => {
  const presentationUrl = `https://presentations.2mas.xyz/reactparis`;
  // eslint-disable-next-line react/display-name
  const c = (component: ComponentType) => () => createElement(component);
  const slides: SlideDefinition[] = [
    () => (
      <TitleSlide
        title="What we learned rebuilding the largest Nordic electronic retail website in Next.js?"
        date={new Date(2025, 3, 20)}
        backgroundImage={background}
        presentationSlug="reactparis"
      />
    ),
    c(Slide1),
    c(Slide2),
    c(Slide3),
    c(Slide4),
  ];
  return (
    <div className="flex h-full items-center relative">
      <Slideshow
        slides={slides}
        initialSlide={initialSlide}
        presentationUrl={presentationUrl}
        // className=""
      />
    </div>
  );
};
