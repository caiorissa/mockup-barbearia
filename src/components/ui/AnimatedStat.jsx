import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

function parseStatValue(value) {
  const match = String(value).match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value, decimals: 0 }
  const num = parseFloat(match[1])
  const suffix = match[2] || ''
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
  return { num, suffix, decimals }
}

export default function AnimatedStat({ value, label, className = '', borderLeft = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const reduceMotion = useReducedMotion()
  const { num, suffix, decimals } = parseStatValue(value)
  const [display, setDisplay] = useState(reduceMotion ? num : 0)

  useEffect(() => {
    if (!isInView || reduceMotion) {
      setDisplay(num)
      return
    }

    let start = 0
    const duration = 1600
    const step = 16
    const increment = num / (duration / step)

    const timer = setInterval(() => {
      start += increment
      if (start >= num) {
        setDisplay(num)
        clearInterval(timer)
      } else {
        setDisplay(start)
      }
    }, step)

    return () => clearInterval(timer)
  }, [isInView, num, reduceMotion])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.floor(display)

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={`${borderLeft ? 'border-l border-white/[0.06] pl-4' : ''} ${className}`}
    >
      <p className="text-2xl font-semibold text-barber-gold">
        {formatted}{suffix}
      </p>
      <p className="text-barber-muted text-[11px] sm:text-xs mt-0.5">{label}</p>
    </motion.div>
  )
}
