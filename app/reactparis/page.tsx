import { ReactParisSlides } from "./slides";

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const ReactParisPage = async ({ searchParams }: SlideProps) => {
  const { slide } = await searchParams;
  const slideNumber = slide ? parseInt(slide as string, 10) : 0;
  return <ReactParisSlides initialSlide={slideNumber} />;
};

export default ReactParisPage;
