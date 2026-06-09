export const EASE_OUT = [0.22, 1, 0.36, 1]

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export function getTransition(reduceMotion, { duration = 0.5, delay = 0, type = 'tween' } = {}) {
  if (reduceMotion) return { duration: 0 }
  return { duration, delay, ease: EASE_OUT, type }
}

export function getViewport(reduceMotion) {
  if (reduceMotion) return { once: true, amount: 0 }
  return { once: true, margin: '-60px' }
}

export function getInitial(reduceMotion, values) {
  return reduceMotion ? false : values
}
