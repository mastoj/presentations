"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedElementProps {
  children: React.ReactNode
  delay: number
  isVisible: boolean
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

