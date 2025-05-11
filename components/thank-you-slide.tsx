import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";

type Props = {
  backgroundImage?: StaticImageData;
};

export const ThankYouSlide = ({
  backgroundImage,
  children,
}: PropsWithChildren<Props>) => {
  // To yyyy-MM-dd string
  return (
    <div className="flex flex-col h-full w-full justify-center items-end gap-4 px-4 md:px-32">
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 w-full h-full">
          <Image
            src={backgroundImage}
            alt="title-background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}
      <h1 className="text-4xl md:text-6xl text-center max-w-4xl md:max-w-[75%] w-full mx-auto">
        Thank you!
      </h1>
      {children}
    </div>
  );
};
