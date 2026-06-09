import { testimonials } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerItem from '../ui/StaggerItem'
import { Star, Quote } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Testimonials() {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="depoimentos" className="section-anchor w-full py-20 lg:py-24 bg-barber-surface/40">
      <Container>
        <SectionHeader
          label="Depoimentos"
          title={<>O que dizem nossos <span className="text-gradient-gold font-semibold">clientes</span></>}
          subtitle="A satisfação de quem confia no Gentleman's Cut fala por si."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map((t, i) => (
            <StaggerItem key={t.id} index={i}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex flex-col p-6 rounded-2xl bg-barber-card border border-white/[0.06] min-w-0 h-full hover:border-white/[0.12] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300"
              >
                <Quote className="w-6 h-6 text-barber-gold/40 mb-4 shrink-0" />
                <p className="text-barber-cream/90 text-sm leading-relaxed flex-1 mb-6 break-words">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{t.name}</p>
                    <p className="text-barber-muted text-xs">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <motion.span
                        key={j}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.05, duration: 0.3 }}
                      >
                        <Star className="w-3 h-3 text-barber-gold fill-barber-gold" />
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  )
}
