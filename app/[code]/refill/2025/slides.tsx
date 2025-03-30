"use client";
import background from "@/assets/images/nextecom/homepage.png";
import { SlideDefinition, Slideshow } from "@/components/slide-show";
import { ThankYouSlide } from "@/components/thank-you-slide";
import SlideVideo from "@/slides/nextecom/slide-video.mdx";
import Slide1 from "@/slides/nextecom/slide1.mdx";
import Slide10 from "@/slides/nextecom/slide10.mdx";
import Slide11 from "@/slides/nextecom/slide11.mdx";
import Slide12 from "@/slides/nextecom/slide12.mdx";
import Slide14 from "@/slides/nextecom/slide14.mdx";
import Slide15 from "@/slides/nextecom/slide15.mdx";
import Slide16 from "@/slides/nextecom/slide16.mdx";
import Slide17 from "@/slides/nextecom/slide17.mdx";
import Slide18 from "@/slides/nextecom/slide18.mdx";
import Slide19 from "@/slides/nextecom/slide19.mdx";
import Slide2 from "@/slides/nextecom/slide2.mdx";
import Slide20 from "@/slides/nextecom/slide20.mdx";
import Slide21 from "@/slides/nextecom/slide21.mdx";
import Slide22 from "@/slides/nextecom/slide22.mdx";
import Slide23 from "@/slides/nextecom/slide23.mdx";
import Slide3 from "@/slides/nextecom/slide3.mdx";
import Slide4 from "@/slides/nextecom/slide4.mdx";
import Slide5 from "@/slides/nextecom/slide5.mdx";
import Slide6 from "@/slides/nextecom/slide6.mdx";
import Slide7 from "@/slides/nextecom/slide7.mdx";
import Slide8 from "@/slides/nextecom/slide8.mdx";
import Slide9 from "@/slides/nextecom/slide9.mdx";
import TitleSlide from "@/slides/title-slide";
import { ComponentType, createElement } from "react";

type SlideProps = {
  initialSlide: number;
};
export const ReactParisSlides = ({ initialSlide }: SlideProps) => {
  const presentationUrl = `https://presentations.2mas.xyz/refill/2025`;
  // eslint-disable-next-line react/display-name
  const c = (component: ComponentType) => () => createElement(component);
  const slides: SlideDefinition[] = [
    () => (
      <TitleSlide
        title="What we learned rebuilding the largest Nordic electronic retail website in Next.js?"
        date={new Date(2025, 3, 4)}
        backgroundImage={background}
        presentationSlug="refill/2025"
      />
    ),
    c(Slide1),
    c(SlideVideo),
    c(Slide2),
    c(Slide3),
    c(Slide4),
    c(Slide5),
    c(Slide6),
    c(Slide7),
    c(Slide8),
    c(Slide9),
    c(Slide10),
    c(Slide11),
    c(Slide12),
    c(Slide23),
    // c(Slide13), // Routing
    c(Slide14),
    c(Slide15),
    c(Slide16),
    c(Slide17),
    c(Slide18),
    c(Slide19),
    c(Slide20),
    c(Slide21),
    c(Slide22),
    () => <ThankYouSlide backgroundImage={background} />,
  ];
  return (
    <div className="flex h-full items-center relative slides ">
      <Slideshow
        slides={slides}
        initialSlide={initialSlide}
        presentationUrl={presentationUrl}
        // className=""
      />
    </div>
  );
};
