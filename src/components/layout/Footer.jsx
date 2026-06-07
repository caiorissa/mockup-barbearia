import { Link } from 'react-router-dom'
import { Scissors, MapPin, Phone, AtSign, Clock } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] mt-16 lg:mt-20">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-barber-gold shrink-0" />
              <span className="font-display text-xl font-bold">Gentleman's Cut</span>
            </div>
            <p className="text-barber-muted text-sm leading-relaxed mb-5">
              Tradição e estilo desde 2014. A barbearia onde cada corte conta uma história.
            </p>
            <Link to="/agendar">
              <Button size="sm">Agendar Agora</Button>
            </Link>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-barber-gold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-barber-muted">
              {[
                { label: 'Serviços', href: '#servicos' },
                { label: 'Experiência', href: '#experiencia' },
                { label: 'Equipe', href: '#equipe' },
                { label: 'Depoimentos', href: '#depoimentos' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-barber-cream transition-colors">{item.label}</a>
                </li>
              ))}
              <li><Link to="/agendar" className="hover:text-barber-cream transition-colors">Agendamento</Link></li>
              <li><Link to="/admin" className="hover:text-barber-cream transition-colors">Painel Admin</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-barber-gold mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-barber-muted">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-barber-gold shrink-0 mt-0.5" />
                Rua das Flores, 123 — Jardins, SP
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-barber-gold shrink-0" />
                (11) 99999-0000
              </p>
              <p className="flex items-center gap-2">
                <AtSign className="w-4 h-4 text-barber-gold shrink-0" />
                @gentlemanscut
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-barber-gold mb-4">Horário</h4>
            <div className="space-y-2 text-sm">
              {[
                { day: 'Seg — Sex', hours: '09h às 19h' },
                { day: 'Sábado', hours: '09h às 17h' },
                { day: 'Domingo', hours: 'Fechado' },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-4 py-1.5 border-b border-white/[0.04]">
                  <span className="text-barber-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> {day}
                  </span>
                  <span className={hours === 'Fechado' ? 'text-barber-muted' : 'text-barber-cream'}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-barber-muted text-center sm:text-left">
          <p>© 2026 Gentleman's Cut — Mockup para portfólio</p>
          <p>Feito com React + Tailwind</p>
        </div>
      </Container>
    </footer>
  )
}
