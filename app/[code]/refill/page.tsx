import { RefillSlides } from "./slides";

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const RefillPage = async ({ searchParams }: SlideProps) => {
  const { slide } = await searchParams;
  const slideNumber = slide ? parseInt(slide as string, 10) : 0;
  return <RefillSlides initialSlide={slideNumber} />;
};

export default RefillPage;
