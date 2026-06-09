import { DollarSign, Calendar, XCircle, UserX, TrendingUp, Radio, Ban, Clock } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Tooltip from '../../components/ui/Tooltip'
import { useBarberStore } from '../../context/BarberStoreContext'
import { motion, AnimatePresence } from 'framer-motion'

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'agora'
  if (mins < 60) return `${mins}min atrás`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h atrás`
  return `${Math.floor(hrs / 24)}d atrás`
}

const activityIcons = {
  booking: Calendar,
  cancel: XCircle,
  noshow: UserX,
  revenue: DollarSign,
  service: TrendingUp,
  professional: TrendingUp,
}

export default function Dashboard() {
  const {
    appointments,
    monthlyReports,
    activityLog,
    lastUpdated,
    updateAppointmentStatus,
  } = useBarberStore()

  const current = monthlyReports[monthlyReports.length - 1]
  const previous = monthlyReports[monthlyReports.length - 2]
  const upcoming = appointments
    .filter((a) => a.status === 'confirmado')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))

  const revenueChange = previous.revenue
    ? (((current.revenue - previous.revenue) / previous.revenue) * 100).toFixed(0)
    : '0'
  const aptChange = previous.appointments
    ? (((current.appointments - previous.appointments) / previous.appointments) * 100).toFixed(0)
    : '0'
  const cancelChange = previous.cancellations
    ? (((current.cancellations - previous.cancellations) / Math.max(previous.cancellations, 1)) * 100).toFixed(0)
    : '0'
  const noShowChange = previous.noShows
    ? (((current.noShows - previous.noShows) / Math.max(previous.noShows, 1)) * 100).toFixed(0)
    : '0'

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Visão geral</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="text-barber-muted mt-1">Junho 2026</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-emerald-500/20 text-emerald-400 text-sm">
            <Radio className="w-4 h-4 animate-pulse" />
            Ao vivo · atualizado {timeAgo(new Date(lastUpdated).toISOString())}
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Receita do Mês" value={`R$ ${current.revenue.toLocaleString()}`} change={`${revenueChange > 0 ? '+' : ''}${revenueChange}%`} index={0} accent="gold" />
        <StatCard icon={Calendar} label="Agendamentos" value={current.appointments} change={`${aptChange > 0 ? '+' : ''}${aptChange}%`} index={1} accent="green" />
        <StatCard icon={XCircle} label="Cancelamentos" value={current.cancellations} change={`${cancelChange > 0 ? '+' : ''}${cancelChange}%`} index={2} accent="red" />
        <StatCard icon={UserX} label="No-Shows" value={current.noShows} change={`${noShowChange > 0 ? '+' : ''}${noShowChange}%`} index={3} accent="amber" />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 !p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Próximos Agendamentos</h2>
            <Badge variant="success" dot>{upcoming.length} confirmados</Badge>
          </div>
          <div className="divide-y divide-white/[0.04] max-h-[420px] overflow-y-auto">
            <AnimatePresence initial={false}>
              {upcoming.map((apt) => (
                <motion.div
                  key={apt.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-barber-gold/10 flex items-center justify-center text-sm font-bold text-barber-gold font-display shrink-0">
                      {apt.client.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{apt.client}</p>
                      <p className="text-barber-muted text-sm truncate">{apt.service} · {apt.professional}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{apt.date}</p>
                      <p className="text-barber-gold text-sm">{apt.time}</p>
                    </div>
                    <div className="flex gap-1">
                      <Tooltip label="Cancelar agendamento" side="left">
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'cancelado')}
                          className="p-2 rounded-lg text-barber-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          aria-label="Cancelar agendamento"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>
                      <Tooltip label="Marcar como no-show" side="left">
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'no-show')}
                          className="p-2 rounded-lg text-barber-muted hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
                          aria-label="Marcar como no-show"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Atividade Recente</h2>
            <Badge dot><Clock className="w-3 h-3 inline mr-1" />Live</Badge>
          </div>
          <div className="divide-y divide-white/[0.04] max-h-[420px] overflow-y-auto">
            <AnimatePresence initial={false}>
              {activityLog.map((item) => {
                const Icon = activityIcons[item.type] || Calendar
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 px-6 py-4"
                  >
                    <div className="p-2 rounded-lg bg-barber-gold/10 shrink-0">
                      <Icon className="w-3.5 h-3.5 text-barber-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{item.text}</p>
                      <p className="text-barber-muted text-xs mt-0.5">{timeAgo(item.time)}</p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  )
}
