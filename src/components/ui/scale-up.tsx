import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ScaleUpProps {
  children: ReactNode
}

const ScaleUp = ({ children }: ScaleUpProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: .8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} 
      // once: true -> animate only the first time it appears
      // amount: 0.3 -> trigger when 30% of element is visible
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

export default ScaleUp
