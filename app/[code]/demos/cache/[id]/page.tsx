import { Column, Columns } from "@/components/columns";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import RevalidateButton from "./_components/revalidate-button";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = () => {
  return [{ code: "" }];
};

// Get random cat image url
const getRandomCat = async (revalidationTime: number) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?rnd=${revalidationTime}`,
    {
      next: {
        revalidate: revalidationTime,
        tags: ["cats", `variant-${revalidationTime.toString()}`],
      },
    }
  );
  const data = await response.json();
  console.log(
    "==> Revalidation time: ",
    revalidationTime,
    data[0].url,
    new Date().toISOString()
  );
  return data[0] as { url: string; width: number; height: number };
};

const getTime = async ({ revalidationTime }: { revalidationTime: number }) => {
  return cache(
    async () => new Date().toLocaleTimeString(),
    [revalidationTime.toString(), "cat"],
    {
      revalidate: revalidationTime,
      tags: ["cats", `variant-${revalidationTime.toString()}`],
    }
  )();
};

const CatImage = async ({ revalidationTime }: { revalidationTime: number }) => {
  const catData = await getRandomCat(revalidationTime);
  return (
    <div className="block gap-2 h-full w-full">
      <div className="h-[80%] overflow-hidden p-4">
        <Image
          src={catData.url}
          alt="Cat image"
          width={catData.width}
          height={catData.height}
          className="object-contain max-w-full max-h-full shadow-lg rounded-lg"
        />
      </div>
      <div className="h-[20%] flex flex-row justify-between">
        <span>{await getTime({ revalidationTime })}</span>
        <RevalidateButton tag={`variant-${revalidationTime.toString()}`}>
          Revalidate {revalidationTime}
        </RevalidateButton>
      </div>
    </div>
  );
};

const CachePage = async ({ params }: Props) => {
  const { id } = await params;
  console.log("==> Cache page: ", id);
  return (
    <Columns columns={2} className="max-w-xl mx-auto py-40 *:border-2">
      <Column>
        <RevalidateButton tag="cats">Revalidate all</RevalidateButton>
      </Column>
      <Column>
        <div className="grid grid-rows-2 w-full gap-2 h-full">
          {[5, 10].map((revalidationTime) => (
            <CatImage
              key={revalidationTime}
              revalidationTime={revalidationTime}
            />
          ))}
        </div>
      </Column>
    </Columns>
  );
};

export default CachePage;
