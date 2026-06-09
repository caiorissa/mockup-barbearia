import { motion, useReducedMotion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  const variants = {
    primary:
      'bg-barber-gold text-barber-dark hover:bg-barber-gold-light shadow-[0_0_0_0_rgba(212,175,55,0)] hover:shadow-[0_4px_24px_-4px_rgba(212,175,55,0.35)]',
    secondary:
      'bg-transparent border border-barber-gold/50 text-barber-gold hover:bg-barber-gold/10 hover:border-barber-gold',
    danger:
      'bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-600/30',
    ghost:
      'bg-white/5 text-barber-cream hover:bg-white/10 border border-transparent',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  const baseClass = `inline-flex items-center justify-center font-semibold rounded-xl transition-[colors,box-shadow,transform] duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-barber-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-barber-dark ${variants[variant]} ${sizes[size]} ${className}`

  if (reduceMotion) {
    return (
      <button className={baseClass} {...props}>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
      </button>
    )
  }

  return (
    <motion.button
      className={baseClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {Icon && (
        <motion.span className="inline-flex shrink-0" whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
          <Icon className="w-4 h-4" />
        </motion.span>
      )}
      {children}
    </motion.button>
  )
}
