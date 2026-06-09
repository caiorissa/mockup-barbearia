import { useBarberStore } from '../../context/BarberStoreContext'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, BarChart3, Radio } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Area, AreaChart,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-barber-elevated border border-white/10 rounded-xl p-4 text-sm shadow-2xl">
      <p className="font-semibold text-barber-gold mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex justify-between gap-6">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-medium">{typeof p.value === 'number' && p.name === 'Receita' ? `R$ ${p.value.toLocaleString()}` : p.value}</span>
        </p>
      ))}
    </div>
  )
}

const chartStyle = { fontSize: 12 }

export default function Reports() {
  const { monthlyReports, lastUpdated } = useBarberStore()
  const totalRevenue = monthlyReports.reduce((s, m) => s + m.revenue, 0)
  const totalAppointments = monthlyReports.reduce((s, m) => s + m.appointments, 0)
  const avgRevenue = Math.round(totalRevenue / monthlyReports.length)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Analytics</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Relatórios Mensais</h1>
          <p className="text-barber-muted">Performance de Janeiro a Junho 2026</p>
        </div>
        <Badge variant="success" dot>
          <Radio className="w-3 h-3 inline mr-1 animate-pulse" />
          Dados ao vivo
        </Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Receita Total" value={`R$ ${totalRevenue.toLocaleString()}`} index={0} accent="gold" />
        <StatCard icon={Calendar} label="Total Agendamentos" value={totalAppointments} index={1} accent="green" />
        <StatCard icon={BarChart3} label="Média Mensal" value={`R$ ${avgRevenue.toLocaleString()}`} index={2} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div key={`revenue-${lastUpdated}`} initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Card className="!p-6">
            <h2 className="font-display text-xl font-bold mb-6">Receita Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyReports}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#6b6b6b" style={chartStyle} />
                <YAxis stroke="#6b6b6b" style={chartStyle} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Receita" stroke="#d4af37" strokeWidth={2} fill="url(#goldGrad)" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div key={`bar-${lastUpdated}`} initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="!p-6">
            <h2 className="font-display text-xl font-bold mb-6">Agendamentos por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReports} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#6b6b6b" style={chartStyle} />
                <YAxis stroke="#6b6b6b" style={chartStyle} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="appointments" name="Agendamentos" fill="#d4af37" radius={[6, 6, 0, 0]} isAnimationActive />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div key={`line-${lastUpdated}`} initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
          <Card className="!p-6">
            <h2 className="font-display text-xl font-bold mb-6">Agendamentos vs Cancelamentos vs No-Shows</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyReports}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#6b6b6b" style={chartStyle} />
                <YAxis stroke="#6b6b6b" style={chartStyle} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                <Line type="monotone" dataKey="appointments" name="Agendamentos" stroke="#d4af37" strokeWidth={2.5} dot={{ fill: '#d4af37', r: 4 }} isAnimationActive />
                <Line type="monotone" dataKey="cancellations" name="Cancelamentos" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} isAnimationActive />
                <Line type="monotone" dataKey="noShows" name="No-Shows" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} isAnimationActive />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
