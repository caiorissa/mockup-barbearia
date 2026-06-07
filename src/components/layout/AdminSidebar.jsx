import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Clock, Users, Scissors, XCircle, UserX,
  BarChart3, ArrowLeft, Menu, X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/horarios', icon: Clock, label: 'Horários' },
  { to: '/admin/profissionais', icon: Users, label: 'Profissionais' },
  { to: '/admin/servicos', icon: Scissors, label: 'Serviços' },
  { to: '/admin/cancelamentos', icon: XCircle, label: 'Cancelamentos' },
  { to: '/admin/no-shows', icon: UserX, label: 'No-Shows' },
  { to: '/admin/relatorios', icon: BarChart3, label: 'Relatórios' },
]

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-barber-gold to-barber-gold-dim flex items-center justify-center">
            <Scissors className="w-4 h-4 text-barber-dark" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-barber-cream leading-none">Painel</h2>
            <p className="text-barber-muted text-[10px] tracking-widest uppercase mt-0.5">Gentleman's Cut</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-barber-gold/10 text-barber-gold shadow-sm shadow-barber-gold/5'
                  : 'text-barber-muted hover:text-barber-cream hover:bg-white/[0.04]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-barber-gold/15' : 'group-hover:bg-white/5'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-barber-gold"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2 text-barber-muted hover:text-barber-gold text-sm mt-8 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao site
      </NavLink>
    </>
  )
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass rounded-xl border border-white/[0.08] text-barber-cream"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside className="hidden lg:flex w-72 bg-barber-surface border-r border-white/[0.06] min-h-screen p-6 flex-col shrink-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-barber-surface border-r border-white/[0.06] z-50 p-6 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 text-barber-muted hover:text-barber-cream"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
