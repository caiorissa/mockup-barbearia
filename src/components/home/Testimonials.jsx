import { testimonials } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section-anchor w-full py-20 lg:py-24 bg-barber-surface/40">
      <Container>
        <SectionHeader
          label="Depoimentos"
          title={<>O que dizem nossos <span className="text-gradient-gold font-semibold">clientes</span></>}
          subtitle="A satisfação de quem confia no Gentleman's Cut fala por si."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col p-6 rounded-2xl bg-barber-card border border-white/[0.06] min-w-0"
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
                    <Star key={j} className="w-3 h-3 text-barber-gold fill-barber-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
