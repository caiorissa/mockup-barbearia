import { motion, useReducedMotion } from 'framer-motion'
import { getInitial, getTransition } from '../../lib/motion'

export default function PageTransition({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={getInitial(reduceMotion, { opacity: 0, y: 16 })}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={getTransition(reduceMotion, { duration: 0.4 })}
      className={className}
    >
      {children}
    </motion.div>
  )
}
