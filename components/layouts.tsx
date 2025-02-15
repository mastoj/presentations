import { PropsWithChildren } from "react";

export const CentralContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center text-center leading-3 w-full h-full">
      {children}
    </div>
  );
};
