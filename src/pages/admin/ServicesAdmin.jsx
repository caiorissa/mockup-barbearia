import { services } from '../../data/mockData'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { motion } from 'framer-motion'
import { Edit, Trash2, Clock } from 'lucide-react'

export default function ServicesAdmin() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Catálogo</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Serviços</h1>
          <p className="text-barber-muted">{services.length} serviços ativos</p>
        </div>
        <Button size="sm">+ Novo Serviço</Button>
      </div>

      <div className="grid gap-3">
        {services.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover={false} className="!p-5">
              <div className="flex items-center gap-5">
                <span className="text-3xl w-12 text-center shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold">{s.name}</h3>
                    {s.featured && <Badge>Popular</Badge>}
                  </div>
                  <p className="text-barber-muted text-sm truncate">{s.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-barber-muted text-sm shrink-0">
                  <Clock className="w-3.5 h-3.5" /> {s.duration} min
                </div>
                <p className="text-xl font-bold text-gradient-gold shrink-0 hidden sm:block">R$ {s.price}</p>
                <div className="flex gap-1 shrink-0">
                  <button className="p-2.5 rounded-xl text-barber-muted hover:text-barber-gold hover:bg-barber-gold/10 transition-all cursor-pointer">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl text-barber-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
