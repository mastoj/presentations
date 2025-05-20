import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { PropsWithChildren } from "react";

export const AnimatedUL = ({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string }>) => {
  console.log("==> REST: ", rest, className);
  return (
    <motion.ul
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "flex flex-col gap-2 pl-6 my-6 text-lg md:text-xl list-disc",
        className
      )}
    >
      {children}
    </motion.ul>
  );
};
