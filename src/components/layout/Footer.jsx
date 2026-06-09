import { Link } from 'react-router-dom'
import { Scissors, MapPin, Phone, AtSign, Clock, ExternalLink } from 'lucide-react'
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
                { label: 'Serviços', href: '/#servicos' },
                { label: 'Experiência', href: '/#experiencia' },
                { label: 'Equipe', href: '/#equipe' },
                { label: 'Depoimentos', href: '/#depoimentos' },
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
              <a
                href="https://maps.google.com/?q=Rua+das+Flores+123+Jardins+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-barber-cream transition-colors"
              >
                <MapPin className="w-4 h-4 text-barber-gold shrink-0 mt-0.5" />
                Rua das Flores, 123 — Jardins, SP
              </a>
              <a
                href="tel:+5511999990000"
                className="flex items-center gap-2 hover:text-barber-cream transition-colors"
              >
                <Phone className="w-4 h-4 text-barber-gold shrink-0" />
                (11) 99999-0000
              </a>
              <a
                href="https://instagram.com/gentlemanscut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-barber-cream transition-colors"
              >
                <AtSign className="w-4 h-4 text-barber-gold shrink-0" />
                @gentlemanscut
              </a>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-barber-muted text-center sm:text-left">
          <p>© 2026 Gentleman's Cut — Mockup para portfólio</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              Desenvolvido por{' '}
              <span className="text-barber-cream">Caio Rissa Silveira</span>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/caaiio.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-barber-cream transition-colors"
              >
                <AtSign className="w-3.5 h-3.5 text-barber-gold" />
                @caaiio.dev
              </a>
              <a
                href="https://github.com/caiorissa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-barber-cream transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 text-barber-gold"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/caio-rissa-silveira-b4706527a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-barber-cream transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-barber-gold" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
