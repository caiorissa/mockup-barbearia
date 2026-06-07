import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Scissors } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const links = [
  { to: '/#servicos', label: 'Serviços' },
  { to: '/#experiencia', label: 'Experiência' },
  { to: '/#equipe', label: 'Equipe' },
  { to: '/#depoimentos', label: 'Depoimentos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/[0.06]' : 'bg-barber-dark/80'
      }`}
    >
      <Container className="py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="p-1.5 rounded-lg border border-barber-gold/20 bg-barber-gold/5">
              <Scissors className="w-4 h-4 text-barber-gold" />
            </div>
            <div>
              <span className="font-display text-base font-bold leading-none block">
                Gentleman's <span className="text-gradient-gold">Cut</span>
              </span>
              <span className="text-[9px] text-barber-muted tracking-widest uppercase">Est. 2014</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="px-3 py-2 text-sm text-barber-muted hover:text-barber-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link to="/admin">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
            <Link to="/agendar">
              <Button size="sm">Agendar</Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-barber-cream rounded-lg hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-white/[0.06] overflow-hidden glass"
          >
            <Container className="py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 text-barber-cream"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/agendar" onClick={() => setOpen(false)} className="mt-2">
                <Button className="w-full">Agendar Horário</Button>
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
