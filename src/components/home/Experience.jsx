import { experience } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerItem from '../ui/StaggerItem'
import { motion, useReducedMotion } from 'framer-motion'

export default function Experience() {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="experiencia" className="section-anchor w-full py-20 lg:py-24 bg-barber-surface/40">
      <Container>
        <SectionHeader
          label="A experiência"
          title={<>Mais que um <span className="text-gradient-gold font-semibold">corte</span></>}
          subtitle="Cada detalhe foi pensado para transformar sua visita em um momento de puro prazer."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experience.map((item, i) => (
            <StaggerItem key={item.title} index={i}>
              <motion.div
                whileHover={reduceMotion ? undefined : { borderColor: 'rgba(212, 175, 55, 0.25)' }}
                className="p-6 rounded-2xl bg-barber-card border border-white/[0.06] hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.08)] transition-[box-shadow,border-color] duration-300 min-w-0 h-full"
              >
                <motion.span
                  className="text-3xl mb-4 block"
                  whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {item.icon}
                </motion.span>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-barber-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  )
}
