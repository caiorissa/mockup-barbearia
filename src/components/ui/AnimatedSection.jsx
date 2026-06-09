import { motion, useReducedMotion } from 'framer-motion'
import { getInitial, getTransition, getViewport } from '../../lib/motion'

export default function AnimatedSection({ children, className = '', delay = 0, id, as = 'section' }) {
  const reduceMotion = useReducedMotion()
  const Component = as === 'div' ? motion.div : motion.section

  return (
    <Component
      id={id}
      initial={getInitial(reduceMotion, { opacity: 0, y: 40 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={getViewport(reduceMotion)}
      transition={getTransition(reduceMotion, { duration: 0.6, delay })}
      className={className}
    >
      {children}
    </Component>
  )
}
