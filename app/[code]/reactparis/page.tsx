"use cache";
import { Suspense } from "react";
import { ReactParisSlides } from "./slides";

export const generateStaticParams = async () => {
  return [];
};

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const ReactParisPage = async ({ searchParams }: SlideProps) => {
  const slideNumber = searchParams.then((sp) =>
    sp.slide ? parseInt(sp.slide as string, 10) : 0
  );
  return (
    <Suspense>
      <ReactParisSlides initialSlide={slideNumber} />;
    </Suspense>
  );
};

export default ReactParisPage;
