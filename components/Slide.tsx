"use client";

import { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { memo, ReactNode } from "react";

interface SlideProps {
  content: ReactNode;
  custom?: number;
  // toggleSlide: (enabled: boolean) => void;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      ease: ["easeIn", "easeOut"],
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const Slide = memo(({ content, custom }: SlideProps) => {
  // const [animationIndex, setAnimationIndex] = useState(0);

  // const triggerNextAnimation = useCallback(() => {
  //   // setAnimationIndex((prevIndex) => prevIndex + 1);
  //   return true;
  // }, []);

  // useImperativeHandle(ref, () => ({
  //   triggerNextAnimation,
  // }));

  // const components = {
  //   ...mdxComponents,
  //   Animate: ({ children }: { children: React.ReactNode }) => (
  //     <Animate isVisible={animationIndex > 0}>{children}</Animate>
  //   ),
  //   code({ node, inline, className, children, ...props }: any) {
  //     const match = /language-(\w+)/.exec(className || "");
  //     return !inline && match ? (
  //       <SyntaxHighlighter
  //         style={tomorrow}
  //         language={match[1]}
  //         PreTag="div"
  //         {...props}
  //       >
  //         {String(children).replace(/\n$/, "")}
  //       </SyntaxHighlighter>
  //     ) : (
  //       <code className={className} {...props}>
  //         {children}
  //       </code>
  //     );
  //   },
  // };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white"
      custom={custom}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="w-full h-full p-8 overflow-auto">
        {content}
        {/* <ReactMarkdown components={components}>
        </ReactMarkdown> */}
      </div>
    </motion.div>
  );
});

Slide.displayName = "Slide";
