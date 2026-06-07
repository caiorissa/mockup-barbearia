import { motion } from 'framer-motion'

export default function AnimatedSection({ children, className = '', delay = 0, id, as = 'section' }) {
  const Component = as === 'div' ? motion.div : motion.section

  return (
    <Component
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
