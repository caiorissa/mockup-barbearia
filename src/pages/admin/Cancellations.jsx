import { useBarberStore } from '../../context/BarberStoreContext'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'
import { XCircle, AlertCircle, RotateCcw } from 'lucide-react'

export default function Cancellations() {
  const { appointments, updateAppointmentStatus } = useBarberStore()
  const cancelled = appointments.filter((a) => a.status === 'cancelado')

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
            Taxa de cancelamento: {appointments.length ? ((cancelled.length / appointments.length) * 100).toFixed(0) : 0}% do total de agendamentos.
          </p>
        </motion.div>
      )}

      <div className="grid gap-3">
        {cancelled.length === 0 ? (
          <Card className="!p-8 text-center text-barber-muted text-sm">Nenhum cancelamento registrado.</Card>
        ) : (
          cancelled.map((apt, i) => (
            <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="!p-5">
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
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-medium">{apt.date}</p>
                      <p className="text-barber-muted text-sm mb-1">{apt.time}</p>
                      <Badge variant="danger" dot>Cancelado</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={RotateCcw}
                      onClick={() => updateAppointmentStatus(apt.id, 'confirmado')}
                    >
                      Reativar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
