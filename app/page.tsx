import path from "path";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slidesDir = path.join(process.cwd(), "app", "slides");
  // const slideFiles = fs
  //   .readdirSync(slidesDir)
  //   .filter((file) => file.endsWith(".mdx"));

  // const slides = await Promise.all(
  //   slideFiles.map(async (file) => {
  //     const filePath = path.join(slidesDir, file);
  //     return fs.readFileSync(filePath, "utf8");
  //   })
  // );

  // const initialSlide =
  //   typeof searchParams.slide === "string"
  //     ? Number.parseInt(searchParams.slide, 10)
  //     : 0;

  return <div>stuff</div>;
  //<SlideShow slides={slides} initialSlide={initialSlide} />
}
