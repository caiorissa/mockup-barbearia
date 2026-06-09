import { professionals } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import Badge from '../ui/Badge'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerItem from '../ui/StaggerItem'
import { Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function Team() {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="equipe" className="section-anchor w-full py-20 lg:py-24">
      <Container>
        <SectionHeader
          label="Nossa equipe"
          title={<>Os <span className="text-gradient-gold font-semibold">Mestres</span></>}
          subtitle="Profissionais apaixonados pela arte de transformar visual em confiança."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {professionals.map((pro, i) => (
            <StaggerItem key={pro.id} index={i}>
              <motion.div
                whileHover={reduceMotion ? undefined : { borderColor: 'rgba(212, 175, 55, 0.25)' }}
                className="p-5 rounded-2xl bg-barber-card border border-white/[0.06] text-center min-w-0 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.08)] transition-[box-shadow,border-color] duration-300 h-full"
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-barber-gold/15 border border-barber-gold/25 flex items-center justify-center text-lg font-bold text-barber-gold font-display"
                >
                  {pro.avatar}
                </motion.div>
                <h3 className="text-base font-semibold mb-0.5">{pro.name}</h3>
                <p className="text-barber-gold text-sm mb-1">{pro.role}</p>
                <p className="text-barber-muted text-xs mb-3">{pro.experience}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 text-barber-gold fill-barber-gold" />
                  <span className="text-sm font-medium">{pro.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {pro.specialties.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
                <Badge variant={pro.available ? 'success' : 'muted'} dot>
                  {pro.available ? 'Disponível' : 'Indisponível'}
                </Badge>
              </motion.div>
            </StaggerItem>
          ))}
        </div>

        <AnimatedSection as="div" delay={0.15} className="text-center mt-10">
          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 text-barber-gold text-sm hover:text-barber-gold-light transition-colors group"
          >
            <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-barber-gold after:transition-all after:duration-300 group-hover:after:w-full">
              Escolha seu barbeiro ao agendar →
            </span>
          </Link>
        </AnimatedSection>
      </Container>
    </AnimatedSection>
  )
}
