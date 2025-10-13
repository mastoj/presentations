import { NdcOsloSlides } from "./slides";

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const NdcOsloPage = async ({ searchParams }: SlideProps) => {
  const { slide } = await searchParams;
  const slideNumber = slide ? parseInt(slide as string, 10) : 0;
  return <NdcOsloSlides initialSlide={slideNumber} />;
};

export default NdcOsloPage;
