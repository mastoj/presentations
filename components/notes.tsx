import { PropsWithChildren } from "react";
import { useFlags } from "./flags-provider";

export const Notes = ({ children }: PropsWithChildren) => {
  const { showNotes } = useFlags();
  if (!showNotes) return null;
  return (
    <div className="flex flex-col text-lg gap-2 absolute top-0 right-0 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg h-screen overflow-y-auto w-full md:w-1/2 opacity-75">
      {children}
    </div>
  );
};
