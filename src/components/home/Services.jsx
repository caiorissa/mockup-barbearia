import { services } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerItem from '../ui/StaggerItem'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="servicos" className="section-anchor w-full py-20 lg:py-24">
      <Container>
        <SectionHeader
          label="O que oferecemos"
          title={<>Nossos <span className="text-gradient-gold font-semibold">Serviços</span></>}
          subtitle="Cada serviço é um ritual. Técnicas clássicas com o toque de mestres barbeiros."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => (
            <StaggerItem key={service.id} index={i}>
              <Card
                glow={service.featured}
                interactive
                className={`h-full flex flex-col min-w-0 ${service.featured ? 'border-barber-gold/25' : ''}`}
              >
                {service.featured && (
                  <div className="mb-3">
                    <Badge dot>Popular</Badge>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    className="text-3xl"
                    whileHover={reduceMotion ? undefined : { scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {service.icon}
                  </motion.span>
                  <span className="flex items-center gap-1 text-barber-muted text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {service.duration} min
                  </span>
                </div>
                <h3 className="text-base font-semibold text-barber-cream mb-2">{service.name}</h3>
                <p className="text-barber-muted text-sm leading-relaxed flex-1 mb-5">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-lg font-semibold text-barber-gold">R$ {service.price}</span>
                  <Link to="/agendar">
                    <motion.button
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                      className="p-2 rounded-lg bg-barber-gold/10 text-barber-gold hover:bg-barber-gold hover:text-barber-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-barber-gold/50"
                      aria-label={`Agendar ${service.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </div>

        <AnimatedSection as="div" delay={0.2} className="text-center mt-10">
          <Link to="/agendar">
            <Button variant="secondary" size="lg" icon={ArrowRight}>Agendar um Serviço</Button>
          </Link>
        </AnimatedSection>
      </Container>
    </AnimatedSection>
  )
}
