"use client";
import background from "@/assets/images/nextecom/homepage.png";
import { SlideDefinition, Slideshow } from "@/components/slide-show";
import { ThankYouSlide } from "@/components/thank-you-slide";
import SlideVideo from "./_slides/slide-video.mdx";
import Slide1 from "./_slides/slide1.mdx";
import Slide10 from "./_slides/slide10.mdx";
import Slide11 from "./_slides/slide11.mdx";
import Slide12 from "./_slides/slide12.mdx";
import Slide13 from "./_slides/slide13.mdx";
import Slide14 from "./_slides/slide14.mdx";
import Slide15 from "./_slides/slide15.mdx";
import Slide2 from "./_slides/slide2.mdx";
import Slide2_1 from "./_slides/slide2.1.mdx";
import Slide3 from "./_slides/slide3.mdx";
import Slide3_1 from "./_slides/slide3.1.mdx";
import Slide3_2 from "./_slides/slide3.2.mdx";
import Slide3_3 from "./_slides/slide3.3.mdx";
import Slide4_0 from "./_slides/slide4.0.mdx";
import Slide4_1 from "./_slides/slide4.1.mdx";
import Slide5 from "./_slides/slide5.mdx";
import Slide6 from "./_slides/slide6.mdx";
import Slide7 from "./_slides/slide7.mdx";
import Slide8 from "./_slides/slide8.mdx";
import Slide9 from "./_slides/slide9.mdx";
import TitleSlide from "@/slides/title-slide";
import { ComponentType, createElement } from "react";
import { CodeTime } from "@/components/code-time";
import Link from "next/link";
import QRCode from "./_assets/qrcode.png";
import Image from "next/image";

type SlideProps = {
  initialSlide: number;
};
export const CloudNativeBergeSlides = ({ initialSlide }: SlideProps) => {
  const presentationUrl = `https://presentations.2mas.xyz/cloudnativebergen/2025`;
  // eslint-disable-next-line react/display-name
  const c = (component: ComponentType) => () => createElement(component);
  const slides: SlideDefinition[] = [
    () => (
      <TitleSlide
        title="Learnings from One Year in Production with Next.js on Vercel"
        date={new Date(2025, 5, 28)}
        backgroundImage={background}
        presentationSlug="cloudnativebergen/2025"
        qrCode={QRCode}
      />
    ),
    c(Slide2),
    c(Slide2_1),
    c(Slide1),
    c(SlideVideo),
    c(Slide3),
    c(Slide3_1),
    c(Slide3_2),
    c(Slide3_3),
    c(Slide4_0),
    c(Slide4_1),
    c(Slide5),
    c(Slide7),
    c(Slide6),
    c(Slide8),
    c(Slide9),
    c(Slide10),
    c(Slide11),
    c(Slide12),
    c(Slide13), // Routing
    c(Slide14),
    () => (
      <CodeTime>
        <CodeTime.Title>Code time</CodeTime.Title>
        <CodeTime.SubTitle className="flex flex-col gap-4 items-center">
          <Link
            href="https://github.com/mastoj/next-demo"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            https://github.com/mastoj/next-demo
          </Link>
          <Link
            href="https://github.com/mastoj/next-demo"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            https://github.com/mastoj/next16-ecom
          </Link>
        </CodeTime.SubTitle>
      </CodeTime>
    ),
    c(Slide15),
    () => (
      <ThankYouSlide backgroundImage={background}>
        <div className="w-72 h-72 absolute bottom-18 right-4">
          <Image
            src={QRCode}
            alt="QR Code for the presentation"
            className="w-full"
          />
        </div>
      </ThankYouSlide>
    ),
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
