import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  date: Date;
  backgroundImage?: StaticImageData;
  presentationSlug: string;
  qrCode?: StaticImageData;
};

const TitleSlide = ({
  title,
  subtitle,
  date,
  backgroundImage,
  presentationSlug,
  qrCode,
}: Props) => {
  // To yyyy-MM-dd string
  const dateString = date.toLocaleDateString("sv-SE");
  const slideLink = `https://presentations.2mas.xyz/${presentationSlug}`;
  return (
    <div className="flex flex-col h-full max-w-screen aspect-video gap-4">
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
      <div className="w-full h-full flex flex-col justify-center items-end gap-4 pr-8 -ml-8 lg:pr-32">
        <h1 className="text-4xl lg:text-6xl text-right max-w-4xl md:max-w-[60%] w-full">
          {title}
        </h1>

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
        {qrCode && (
          <div className="w-40 h-40 place-self-end mb-8">
            <Image src={qrCode} alt="QR Code for the presentation" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleSlide;
