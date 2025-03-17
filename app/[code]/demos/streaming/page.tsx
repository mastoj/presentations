import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithChildren, Suspense } from "react";

const Box = async ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "w-full h-20 flex justify-center items-center gap-2 py-8",
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

const ContentSkeleton = () => {
  return (
    <Box className="py-0">
      <Skeleton className="w-full h-full" />
    </Box>
  );
};

const StaticStreamingPage = async () => {
  return (
    <div className="h-full w-full *:border *:border-blue-700 py-8 gap-2">
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>
    </div>
  );
};

export default StaticStreamingPage;
