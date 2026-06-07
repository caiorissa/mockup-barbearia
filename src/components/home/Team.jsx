import { professionals } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import Badge from '../ui/Badge'
import { Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Team() {
  return (
    <section id="equipe" className="section-anchor w-full py-20 lg:py-24">
      <Container>
        <SectionHeader
          label="Nossa equipe"
          title={<>Os <span className="text-gradient-gold font-semibold">Mestres</span></>}
          subtitle="Profissionais apaixonados pela arte de transformar visual em confiança."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {professionals.map((pro) => (
            <div
              key={pro.id}
              className="p-5 rounded-2xl bg-barber-card border border-white/[0.06] text-center min-w-0 hover:border-barber-gold/20 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-barber-gold/15 border border-barber-gold/25 flex items-center justify-center text-lg font-bold text-barber-gold font-display">
                {pro.avatar}
              </div>
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
            </div>
          ))}
        </div>

        <p className="text-center mt-10">
          <Link to="/agendar" className="inline-flex items-center gap-2 text-barber-gold text-sm hover:underline">
            <Calendar className="w-4 h-4" />
            Escolha seu barbeiro ao agendar →
          </Link>
        </p>
      </Container>
    </section>
  )
}
