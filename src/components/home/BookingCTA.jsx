import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import AnimatedSection from '../ui/AnimatedSection'
import TextReveal from '../ui/TextReveal'
import { motion, useReducedMotion } from 'framer-motion'
import { getInitial, getTransition } from '../../lib/motion'

export default function BookingCTA() {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatedSection className="w-full py-20 lg:py-24">
      <Container>
        <motion.div
          initial={getInitial(reduceMotion, { opacity: 0, scale: 0.98 })}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={getTransition(reduceMotion, { duration: 0.6 })}
          whileHover={reduceMotion ? undefined : { scale: 1.005 }}
          className="rounded-2xl border border-barber-gold/15 bg-gradient-to-br from-barber-burgundy/30 via-barber-card to-barber-green/20 p-8 lg:p-12 text-center lg:text-left transition-shadow duration-300 hover:shadow-[0_16px_48px_-12px_rgba(212,175,55,0.1)] hover:border-barber-gold/25"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="min-w-0">
              <motion.p
                initial={getInitial(reduceMotion, { opacity: 0, y: 10 })}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(reduceMotion, { duration: 0.4, delay: 0.1 })}
                className="text-barber-gold text-xs tracking-widest uppercase mb-3"
              >
                {reduceMotion ? 'Reserve agora' : <TextReveal text="Reserve agora" mode="words" />}
              </motion.p>
              <motion.h2
                initial={getInitial(reduceMotion, { opacity: 0, y: 16 })}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(reduceMotion, { duration: 0.5, delay: 0.15 })}
                className="font-display text-3xl sm:text-4xl font-bold mb-3 leading-tight"
              >
                Pronto para um <span className="text-gradient-gold font-semibold">novo visual</span>?
              </motion.h2>
              <motion.p
                initial={getInitial(reduceMotion, { opacity: 0, y: 12 })}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(reduceMotion, { duration: 0.45, delay: 0.25 })}
                className="text-barber-muted text-sm sm:text-base max-w-md mx-auto lg:mx-0"
              >
                {reduceMotion
                  ? 'Agende online em menos de 2 minutos. Sem fila, sem complicação.'
                  : <TextReveal text="Agende online em menos de 2 minutos. Sem fila, sem complicação." mode="words" delay={0.2} />}
              </motion.p>
            </div>
            <motion.div
              initial={getInitial(reduceMotion, { opacity: 0, x: 20 })}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={getTransition(reduceMotion, { duration: 0.5, delay: 0.35 })}
              className="shrink-0 mx-auto lg:mx-0"
            >
              <Link to="/agendar">
                <Button size="lg" icon={ArrowRight}>Agendar Agora</Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}
