import type { MDXComponents } from "mdx/types";
import * as motion from "motion/react-client";

export const CustomH1 = ({ children }: { children: React.ReactNode }) => (
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl md:text-6xl font-bold mb-6"
  >
    {children}
  </motion.h1>
);

export const CustomBlockquote = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="border-l-4 border-blue-500 pl-4 italic my-6 text-lg md:text-xl"
  >
    {children}
  </motion.blockquote>
);

export const mdxComponents = {
  h1: CustomH1,
  blockquote: CustomBlockquote,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
