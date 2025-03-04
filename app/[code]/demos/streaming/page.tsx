import { Suspense } from "react";
import FadeInComponent from "../layout/_components/fade-in-component";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const QueryParamComponent = async ({ searchParams }: Props) => {
  // Sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <FadeInComponent>
      <div>Hello query! {JSON.stringify(await searchParams)}</div>
    </FadeInComponent>
  );
};

const Content = async () => {
  // Sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>Hello static!</div>;
};
const StaticStreamingPage = async ({ searchParams }: Props) => {
  return (
    <div className="h-full grid grid-flow-row justify-between *:border *:border-blue-700 py-8 gap-2">
      StaticStreamingPage:
      <Suspense>
        <Content />
      </Suspense>
      <Suspense fallback={<div>Loading some stuff...</div>}>
        <QueryParamComponent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default StaticStreamingPage;
