import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as = 'span',
  mode = 'words',
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion || !text) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  const units = mode === 'chars' ? text.split('') : text.split(' ')
  const Tag = motion[as] ?? motion.span

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.45,
            delay: delay + i * (mode === 'chars' ? 0.02 : 0.07),
            ease: EASE_OUT,
          }}
          className="inline-block"
          style={{ marginRight: mode === 'words' && i < units.length - 1 ? '0.28em' : undefined }}
          aria-hidden="true"
        >
          {unit === ' ' ? '\u00A0' : unit}
        </motion.span>
      ))}
    </Tag>
  )
}
