import { PropsWithChildren } from "react";

const StreamingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 py-8 max-w-md mx-auto">
      <h1 className="text-8xl w-full">Streaming</h1>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default StreamingLayout;
