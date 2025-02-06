import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  date: Date;
  backgroundImage?: StaticImageData;
  presentationSlug: string;
};

const TitleSlide = ({
  title,
  subtitle,
  date,
  backgroundImage,
  presentationSlug,
}: Props) => {
  // To yyyy-MM-dd string
  const dateString = date.toISOString().split("T")[0];
  const slideLink = `https://presentations.2mas.xyz/${presentationSlug}`;
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
      <h1 className="text-4xl text-right max-w-4xl">{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <p className="flex flex-col text-right italic text-subtle">
        <span>Tomas Jansson - {dateString}</span>
        <span>Principal Software Engineer, Elkjøp Nordic AS</span>
        <span>
          Slides:{" "}
          <a href={slideLink} target="_blank" className="text-green-400">
            {slideLink}
          </a>
        </span>
      </p>
    </div>
  );
};

export default TitleSlide;
