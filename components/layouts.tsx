import { PropsWithChildren } from "react";

export const CentralContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center text-center leading-3 w-full h-full">
      {children}
    </div>
  );
};
