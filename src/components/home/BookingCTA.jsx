import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

export default function BookingCTA() {
  return (
    <section className="w-full py-20 lg:py-24">
      <Container>
        <div className="rounded-2xl border border-barber-gold/15 bg-gradient-to-br from-barber-burgundy/30 via-barber-card to-barber-green/20 p-8 lg:p-12 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="min-w-0">
              <p className="text-barber-gold text-xs tracking-widest uppercase mb-3">Reserve agora</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 leading-tight">
                Pronto para um <span className="text-gradient-gold font-semibold">novo visual</span>?
              </h2>
              <p className="text-barber-muted text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                Agende online em menos de 2 minutos. Sem fila, sem complicação.
              </p>
            </div>
            <Link to="/agendar" className="shrink-0 mx-auto lg:mx-0">
              <Button size="lg" icon={ArrowRight}>Agendar Agora</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
