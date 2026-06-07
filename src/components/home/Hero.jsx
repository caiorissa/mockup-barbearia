import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Scissors, Clock } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const stats = [
  { value: '10+', label: 'Anos de tradição' },
  { value: '2.9k', label: 'Clientes atendidos' },
  { value: '4.9', label: 'Avaliação média' },
]

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,21,40,0.4)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,58,47,0.2)_0%,transparent_50%)]" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-barber-gold/25 bg-barber-gold/5 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-barber-gold fill-barber-gold" />
              <span className="text-xs text-barber-gold">Barbearia Premium — São Paulo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            >
              Onde tradição encontra{' '}
              <span className="text-gradient-gold font-semibold">estilo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-barber-muted text-base lg:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Experiência exclusiva com profissionais mestres, produtos importados
              e um ritual de cuidado para o cavalheiro moderno.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/agendar">
                <Button size="lg" icon={ArrowRight}>Agendar Horário</Button>
              </Link>
              <a href="#servicos">
                <Button variant="secondary" size="lg">Ver Serviços</Button>
              </a>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 max-w-sm border-t border-white/[0.06] pt-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'border-l border-white/[0.06] pl-4' : ''}>
                  <p className="text-2xl font-semibold text-barber-gold">{stat.value}</p>
                  <p className="text-barber-muted text-[11px] sm:text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block min-w-0"
          >
            <div className="rounded-2xl border border-barber-gold/20 bg-barber-card overflow-hidden ml-auto max-w-sm">
              <div className="h-40 bg-gradient-to-br from-barber-burgundy/50 to-barber-green/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-barber-gold/15 border border-barber-gold/30 flex items-center justify-center">
                  <Scissors className="w-7 h-7 text-barber-gold" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-barber-gold text-[10px] tracking-widest uppercase mb-1">Destaque</p>
                <h3 className="text-xl font-semibold mb-2">Corte + Barba</h3>
                <p className="text-barber-muted text-sm mb-4">Toalha quente, navalha artesanal e finalização impecável.</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div>
                    <p className="text-xs text-barber-muted">A partir de</p>
                    <p className="text-xl font-semibold text-barber-gold">R$ 70</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-barber-muted">
                    <Clock className="w-4 h-4 text-barber-gold/70" />
                    50 min
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
