import { schedules, professionals } from '../../data/mockData'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const dayOrder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function Schedules() {
  const grouped = professionals.map(pro => ({
    pro,
    slots: schedules.filter(s => s.professionalId === pro.id).sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    ),
  }))

  return (
    <div>
      <div className="mb-10">
        <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Gestão</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Horários</h1>
        <p className="text-barber-muted">Grade de disponibilidade dos profissionais</p>
      </div>

      <div className="grid gap-6">
        {grouped.map(({ pro, slots }, gi) => (
          <motion.div
            key={pro.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
          >
            <Card hover={false} className="!p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-barber-gold/15 flex items-center justify-center font-bold text-barber-gold text-sm font-display">
                    {pro.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{pro.name}</p>
                    <p className="text-barber-muted text-xs">{pro.role}</p>
                  </div>
                </div>
                <Badge variant={pro.available ? 'success' : 'muted'} dot>
                  {pro.available ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {slots.map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-barber-gold/60" />
                      <span className="font-medium text-sm w-20">{s.day}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-barber-gold text-sm font-medium">{s.start} — {s.end}</p>
                      <p className="text-barber-muted text-xs">Intervalo: {s.breaks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
