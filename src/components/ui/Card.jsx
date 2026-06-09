import { motion, useReducedMotion } from 'framer-motion'

export default function Card({ children, className = '', onClick, glow = false, interactive = false }) {
  const reduceMotion = useReducedMotion()
  const isInteractive = interactive || onClick

  const baseClass = `
    relative bg-barber-card rounded-2xl p-6
    border border-white/[0.06]
    transition-[colors,box-shadow,transform,border-color] duration-300
    ${glow ? 'border-barber-gold/20' : ''}
    ${isInteractive ? 'cursor-pointer hover:border-barber-gold/25 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.12)]' : 'hover:border-white/[0.1]'}
    ${className}
  `

  if (reduceMotion) {
    return (
      <div onClick={onClick} className={baseClass}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      onClick={onClick}
      className={baseClass}
      whileHover={isInteractive ? { y: -4 } : { y: -2 }}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      {children}
    </motion.div>
  )
}
