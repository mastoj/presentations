import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  columns: number;
};

export const Columns = ({ columns, children }: PropsWithChildren<Props>) => {
  return <div className={`grid grid-cols-${columns} gap-4`}>{children}</div>;
};

export const Column = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("w-full overflow-hidden h-full", className)}>
      {children}
    </div>
  );
};
