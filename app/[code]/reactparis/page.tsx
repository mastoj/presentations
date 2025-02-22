"use cache";
import { precomputeFlags } from "@/lib/flags";
import { generatePermutations } from "flags/next";
import { ReactParisSlides } from "./slides";

export const generateStaticParams = async () => {
  const codes = await generatePermutations(precomputeFlags);
  return codes.map((code) => ({ code }));
};

type SlideProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const ReactParisPage = async ({ searchParams }: SlideProps) => {
  const slideNumber = searchParams.then((sp) =>
    sp.slide ? parseInt(sp.slide as string, 10) : 0
  );
  return <ReactParisSlides initialSlide={slideNumber} />;
};

export default ReactParisPage;
