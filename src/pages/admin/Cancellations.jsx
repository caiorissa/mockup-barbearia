import { appointments } from '../../data/mockData'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { motion } from 'framer-motion'
import { XCircle, AlertCircle } from 'lucide-react'

export default function Cancellations() {
  const cancelled = appointments.filter(a => a.status === 'cancelado')

  return (
    <div>
      <div className="mb-10">
        <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Monitoramento</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Cancelamentos</h1>
        <p className="text-barber-muted">{cancelled.length} cancelamentos registrados este mês</p>
      </div>

      {cancelled.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-500/5 border border-red-500/15 mb-6"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <p className="text-sm text-red-300/80">
            Taxa de cancelamento: {((cancelled.length / appointments.length) * 100).toFixed(0)}% do total de agendamentos.
          </p>
        </motion.div>
      )}

      <div className="grid gap-3">
        {cancelled.map((apt, i) => (
          <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card hover={false} className="!p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-500/10">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{apt.client}</p>
                    <p className="text-barber-muted text-sm">{apt.service} · {apt.professional}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{apt.date}</p>
                  <p className="text-barber-muted text-sm mb-1">{apt.time}</p>
                  <Badge variant="danger" dot>Cancelado</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
