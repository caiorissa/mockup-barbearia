import { useState } from 'react'
import { useBarberStore } from '../../context/BarberStoreContext'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Modal, { FormField, inputClass, ModalActions } from '../../components/ui/Modal'
import { motion } from 'framer-motion'
import { Clock, Edit } from 'lucide-react'

const dayOrder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function Schedules() {
  const { professionals, schedules, updateSchedule } = useBarberStore()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ start: '', end: '', breaks: '' })

  const grouped = professionals.map((pro) => ({
    pro,
    slots: schedules.filter((s) => s.professionalId === pro.id).sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    ),
  }))

  const openEdit = (slot) => {
    setEditing(slot)
    setForm({ start: slot.start, end: slot.end, breaks: slot.breaks })
  }

  const handleSave = () => {
    if (!editing) return
    updateSchedule({ id: editing.id, ...form })
    setEditing(null)
  }

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
            <Card className="!p-0 overflow-hidden">
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
                {slots.length === 0 ? (
                  <p className="px-6 py-4 text-sm text-barber-muted">Sem horários cadastrados.</p>
                ) : (
                  slots.map((s) => (
                    <div key={s.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.02] transition-colors gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-barber-gold/60" />
                        <span className="font-medium text-sm w-20">{s.day}</span>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="text-barber-gold text-sm font-medium">{s.start} — {s.end}</p>
                          <p className="text-barber-muted text-xs">Intervalo: {s.breaks}</p>
                        </div>
                        <button
                          onClick={() => openEdit(s)}
                          className="p-2 rounded-lg text-barber-muted hover:text-barber-gold hover:bg-barber-gold/10 transition-colors cursor-pointer"
                          aria-label={`Editar horário ${s.day}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `Editar — ${editing.day}` : 'Editar horário'}
        footer={<ModalActions onCancel={() => setEditing(null)} onConfirm={handleSave} />}
      >
        <FormField label="Início">
          <input className={inputClass} value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} placeholder="09:00" />
        </FormField>
        <FormField label="Fim">
          <input className={inputClass} value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} placeholder="18:00" />
        </FormField>
        <FormField label="Intervalo">
          <input className={inputClass} value={form.breaks} onChange={(e) => setForm({ ...form, breaks: e.target.value })} placeholder="12:00 – 13:00" />
        </FormField>
      </Modal>
    </div>
  )
}
