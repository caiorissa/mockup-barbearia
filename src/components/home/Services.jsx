import { services } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <section id="servicos" className="section-anchor w-full py-20 lg:py-24">
      <Container>
        <SectionHeader
          label="O que oferecemos"
          title={<>Nossos <span className="text-gradient-gold font-semibold">Serviços</span></>}
          subtitle="Cada serviço é um ritual. Técnicas clássicas com o toque de mestres barbeiros."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service) => (
            <Card
              key={service.id}
              glow={service.featured}
              className={`h-full flex flex-col min-w-0 ${service.featured ? 'border-barber-gold/25' : ''}`}
            >
              {service.featured && (
                <div className="mb-3">
                  <Badge dot>Popular</Badge>
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{service.icon}</span>
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
                  <button className="p-2 rounded-lg bg-barber-gold/10 text-barber-gold hover:bg-barber-gold hover:text-barber-dark transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/agendar">
            <Button variant="secondary" size="lg" icon={ArrowRight}>Agendar um Serviço</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
