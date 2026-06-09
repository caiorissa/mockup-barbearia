import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

export default function StaggerItem({
  children,
  index = 0,
  className = '',
  hover = true,
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
