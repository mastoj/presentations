"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
import { mdxComponents } from "./mdx-components"
import { AnimatedElement } from "./AnimatedElement"

interface SlideProps {
  content: string
  custom?: number
  onComplete: () => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

const components = {
  ...mdxComponents,
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export function Slide({ content, custom, onComplete }: SlideProps) {
  const [revealIndex, setRevealIndex] = useState(0)
  const elements = content.split("---").map((elem) => elem.trim())

  const triggerNextAnimation = useCallback(() => {
    if (revealIndex < elements.length - 1) {
      setRevealIndex(revealIndex + 1)
      return true
    } else {
      onComplete()
      return false
    }
  }, [revealIndex, elements.length, onComplete])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white cursor-pointer"
      custom={custom}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      onClick={triggerNextAnimation}
    >
      <div className="w-full h-full p-8 overflow-auto">
        {elements.map((element, index) => (
          <AnimatedElement key={index} isVisible={index <= revealIndex} delay={index * 0.2}>
            <ReactMarkdown components={components}>{element}</ReactMarkdown>
          </AnimatedElement>
        ))}
      </div>
    </motion.div>
  )
}

