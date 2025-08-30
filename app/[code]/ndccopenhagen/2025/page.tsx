import { NdcCopenhagen2025Slides } from "./slides";

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const NdcCopenhagen2025Page = async ({ searchParams }: SlideProps) => {
  console.log("==> STUFF");
  const { slide } = await searchParams;
  const slideNumber = slide ? parseInt(slide as string, 10) : 0;
  return <NdcCopenhagen2025Slides initialSlide={slideNumber} />;
};

export default NdcCopenhagen2025Page;
