import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  columns: number;
  className?: string;
};

export const Columns = ({
  columns,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(`grid grid-cols-${columns} gap-4 h-full w-full`, className)}
    >
      {children}
    </div>
  );
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
