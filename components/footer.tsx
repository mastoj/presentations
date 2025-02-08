import { JSX } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { useSlideshow } from "./slide-show-hooks";

const SlideNavigator = () => {
  const { numberOfSlides, currentSlide, nextSlide, previousSlide } =
    useSlideshow();
  console.log("==> Number of slides: ", numberOfSlides);

  return (
    <div className="text-subtle flex items-center gap-2">
      <button
        className="hover:cursor-pointer hover:bg-gray-700 p-1"
        onClick={previousSlide}
        disabled={currentSlide === 0}
      >
        <PiCaretLeft className="w-6 h-6"></PiCaretLeft>
      </button>
      <span>
        {currentSlide + 1} / {numberOfSlides}
      </span>
      <button
        className="hover:cursor-pointer hover:bg-gray-700 p-1"
        onClick={nextSlide}
        disabled={currentSlide === numberOfSlides}
      >
        <PiCaretRight className="w-6 h-6"></PiCaretRight>
      </button>
    </div>
  );
};

export const Footer = ({
  presentationUrl,
  links,
}: {
  presentationUrl: string;
  links: { title: string; url: string; icon: JSX.Element }[];
}) => {
  return (
    <div className="w-full fixed bottom-0 flex justify-between p-4 z-10">
      <SlideNavigator />

      <div className="flex flex-col md:flex-row gap-2 items-center text-subtle content-center">
        <a
          href={presentationUrl}
          className="text-green-400"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {presentationUrl}
        </a>
        <div className="flex flex-row items-center gap-2 content-center">
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
    </div>
  );
};
