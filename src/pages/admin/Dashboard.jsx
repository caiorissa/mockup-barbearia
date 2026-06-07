import { DollarSign, Calendar, XCircle, UserX, TrendingUp } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { appointments, monthlyReports } from '../../data/mockData'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const current = monthlyReports[monthlyReports.length - 1]
  const previous = monthlyReports[monthlyReports.length - 2]
  const upcoming = appointments.filter(a => a.status === 'confirmado')
  const revenueChange = (((current.revenue - previous.revenue) / previous.revenue) * 100).toFixed(0)

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
            <TrendingUp className="w-4 h-4" />
            Receita em alta
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Receita do Mês" value={`R$ ${current.revenue.toLocaleString()}`} change={`${revenueChange > 0 ? '+' : ''}${revenueChange}%`} index={0} accent="gold" />
        <StatCard icon={Calendar} label="Agendamentos" value={current.appointments} change="+8%" index={1} accent="green" />
        <StatCard icon={XCircle} label="Cancelamentos" value={current.cancellations} change="-15%" index={2} accent="red" />
        <StatCard icon={UserX} label="No-Shows" value={current.noShows} change="-20%" index={3} accent="amber" />
      </div>

      <Card hover={false} className="!p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Próximos Agendamentos</h2>
          <Badge variant="success" dot>{upcoming.length} confirmados</Badge>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {upcoming.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-barber-gold/10 flex items-center justify-center text-sm font-bold text-barber-gold font-display">
                  {apt.client.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{apt.client}</p>
                  <p className="text-barber-muted text-sm">{apt.service} · {apt.professional}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{apt.date}</p>
                <p className="text-barber-gold text-sm">{apt.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
