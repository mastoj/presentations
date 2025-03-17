import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { unstable_cache as cache } from "next/cache";
import { PropsWithChildren, Suspense } from "react";

const Box = async ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "w-full h-20 flex justify-center items-center gap-2 py-8 px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const Content = async () => {
  // Sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <Box>Hello streamed content!</Box>;
};

const CachedContent = async () => {
  // Sleep for 2 seconds
  const text = await cache(
    async () =>
      (await new Promise((resolve) =>
        setTimeout(() => resolve(new Date().toUTCString()), 2000)
      )) as string,
    [],
    {
      tags: ["cached-content"],
      revalidate: 10,
    }
  )();
  return (
    <Box className="flex-col">
      Hello cached content!
      <div>{text}</div>
    </Box>
  );
};

const ContentSkeleton = () => {
  return (
    <Box className="py-0">
      <Skeleton className="w-full h-full flex justify-center items-center">
        Loading...
      </Skeleton>
    </Box>
  );
};

const StaticStreamingPage = async () => {
  return (
    <div className="h-full w-full flex *:border *:border-blue-700 py-8 gap-2">
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <CachedContent />
      </Suspense>
    </div>
  );
};

export default StaticStreamingPage;
