"use client";
import { SlideDefinition, Slideshow } from "@/components/slide-show";
import TitleSlide from "@/components/title-slide";
import background from "@/images/nextecom/homepage.png";
import { ComponentType, createElement } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Slide1 from "./_slides/slide1.mdx";
import Slide2 from "./_slides/slide2.mdx";
import Slide3 from "./_slides/slide3.mdx";

const links = [
  {
    title: "GitHub",
    url: "https://github.com/mastoj",
    icon: <SiGithub className="w-6 h-6" />,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/tomasjansson/",
    icon: <SiLinkedin className="w-6 h-6" />,
  },
];

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
  ];
  return (
    <div className="flex h-full items-center relative">
      <Slideshow
        slides={slides}
        initialSlide={initialSlide}
        // className=""
      />
      <div className="absolute bottom-4 right-0 flex gap-2 items-center text-subtle z-10">
        <a
          href={presentationUrl}
          className="self-end text-green-400"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {presentationUrl}
        </a>
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className=""
            onClick={(e) => e.stopPropagation()}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};
