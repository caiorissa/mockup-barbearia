import { useState } from 'react'
import { useBarberStore } from '../../context/BarberStoreContext'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal, { FormField, inputClass, ModalActions } from '../../components/ui/Modal'
import { motion } from 'framer-motion'
import { Star, Edit, Users } from 'lucide-react'

const emptyForm = { name: '', role: '', experience: '', specialties: '', available: true }

export default function ProfessionalsAdmin() {
  const { professionals, addProfessional, updateProfessional } = useBarberStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (pro) => {
    setEditing(pro)
    setForm({
      name: pro.name,
      role: pro.role,
      experience: pro.experience,
      specialties: pro.specialties.join(', '),
      available: pro.available,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim()) return
    const data = {
      name: form.name.trim(),
      role: form.role.trim(),
      experience: form.experience.trim() || '1 ano',
      specialties: form.specialties.split(',').map((s) => s.trim()).filter(Boolean),
      available: form.available,
    }
    if (editing) {
      updateProfessional({ id: editing.id, ...data })
    } else {
      addProfessional(data)
    }
    setModalOpen(false)
  }

  const toggleAvailable = (pro) => {
    updateProfessional({ id: pro.id, available: !pro.available })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Equipe</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Profissionais</h1>
          <p className="text-barber-muted flex items-center gap-2">
            <Users className="w-4 h-4" /> {professionals.length} barbeiros cadastrados
          </p>
        </div>
        <Button size="sm" onClick={openAdd}>+ Adicionar</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {professionals.map((pro, i) => (
          <motion.div key={pro.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="!p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-barber-gold/25 to-barber-gold/5 flex items-center justify-center text-xl font-bold text-barber-gold font-display border border-barber-gold/15">
                    {pro.avatar}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{pro.name}</h3>
                    <p className="text-barber-gold text-sm">{pro.role}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Star className="w-3.5 h-3.5 text-barber-gold fill-barber-gold" />
                      <span className="text-sm font-medium">{pro.rating}</span>
                      <span className="text-barber-muted text-xs">· {pro.experience}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openEdit(pro)}
                  className="p-2 rounded-lg text-barber-muted hover:text-barber-gold hover:bg-barber-gold/10 transition-all cursor-pointer"
                  aria-label={`Editar ${pro.name}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pro.specialties.map((s) => <Badge key={s}>{s}</Badge>)}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <button onClick={() => toggleAvailable(pro)} className="cursor-pointer">
                  <Badge variant={pro.available ? 'success' : 'muted'} dot>
                    {pro.available ? 'Disponível' : 'Indisponível'}
                  </Badge>
                </button>
                <span className="text-barber-muted text-xs">{pro.appointments}+ atendimentos</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar Profissional' : 'Novo Profissional'}
        footer={<ModalActions onCancel={() => setModalOpen(false)} onConfirm={handleSave} confirmLabel={editing ? 'Salvar' : 'Adicionar'} />}
      >
        <FormField label="Nome">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Cargo">
          <input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Ex: Barbeiro Sênior" />
        </FormField>
        <FormField label="Experiência">
          <input className={inputClass} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="Ex: 5 anos" />
        </FormField>
        <FormField label="Especialidades (separadas por vírgula)">
          <input className={inputClass} value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} placeholder="Degradê, Barba" />
        </FormField>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-barber-gold" />
          Disponível para agendamento
        </label>
      </Modal>
    </div>
  )
}
