import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimateProps {
  children: React.ReactNode
  isVisible: boolean
}

export const Animate: React.FC<AnimateProps> = ({ children, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

