import { motion, useReducedMotion } from 'framer-motion'
import TextReveal from './TextReveal'
import { EASE_OUT, getInitial, getTransition } from '../../lib/motion'

export default function SectionHeader({ label, title, subtitle, align = 'center' }) {
  const reduceMotion = useReducedMotion()
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-12 lg:mb-14 ${alignClass}`}>
      <motion.p
        initial={getInitial(reduceMotion, { opacity: 0, y: 12 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={getTransition(reduceMotion, { duration: 0.45, delay: 0 })}
        className="text-barber-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3"
      >
        {reduceMotion ? label : <TextReveal text={label} mode="words" />}
      </motion.p>

      <motion.h2
        initial={getInitial(reduceMotion, { opacity: 0, y: 20 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={getTransition(reduceMotion, { duration: 0.55, delay: 0.08 })}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={getInitial(reduceMotion, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={getTransition(reduceMotion, { duration: 0.5, delay: 0.16 })}
          className="text-barber-muted text-sm sm:text-base leading-relaxed"
        >
          {reduceMotion ? subtitle : <TextReveal text={subtitle} mode="words" delay={0.1} />}
        </motion.p>
      )}

      <motion.div
        initial={getInitial(reduceMotion, { scaleX: 0, opacity: 0 })}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={getTransition(reduceMotion, { duration: 0.6, delay: 0.24, ease: EASE_OUT })}
        className={`divider-gold mt-6 w-20 origin-left ${align === 'center' ? 'mx-auto origin-center' : ''}`}
        aria-hidden="true"
      />
    </div>
  )
}
