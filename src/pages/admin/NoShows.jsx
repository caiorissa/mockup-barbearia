import { appointments } from '../../data/mockData'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { motion } from 'framer-motion'
import { UserX, AlertTriangle } from 'lucide-react'

export default function NoShows() {
  const noShows = appointments.filter(a => a.status === 'no-show')

  return (
    <div>
      <div className="mb-10">
        <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Monitoramento</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">No-Shows</h1>
        <p className="text-barber-muted">Clientes que não compareceram ao agendamento</p>
      </div>

      {noShows.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-6"
        >
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-200 font-medium">{noShows.length} no-show(s) este mês</p>
            <p className="text-xs text-amber-200/60 mt-1">Considere ativar lembretes automáticos por WhatsApp 24h antes.</p>
          </div>
        </motion.div>
      )}

      <div className="grid gap-3">
        {noShows.map((apt, i) => (
          <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card hover={false} className="!p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <UserX className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{apt.client}</p>
                    <p className="text-barber-muted text-sm">{apt.service} · {apt.professional}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{apt.date}</p>
                  <p className="text-barber-muted text-sm mb-1">{apt.time}</p>
                  <Badge variant="warning" dot>No-Show</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
