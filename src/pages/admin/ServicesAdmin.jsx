import { useState } from 'react'
import { useBarberStore } from '../../context/BarberStoreContext'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal, { FormField, inputClass, ModalActions } from '../../components/ui/Modal'
import { motion } from 'framer-motion'
import { Edit, Trash2, Clock } from 'lucide-react'

const emptyForm = { name: '', price: '', duration: '', description: '', icon: '✂️', featured: false }

export default function ServicesAdmin() {
  const { services, addService, updateService, deleteService } = useBarberStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (s) => {
    setEditing(s)
    setForm({
      name: s.name,
      price: String(s.price),
      duration: String(s.duration),
      description: s.description,
      icon: s.icon,
      featured: s.featured,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.price || !form.duration) return
    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      duration: Number(form.duration),
      description: form.description.trim(),
      icon: form.icon || '✂️',
      featured: form.featured,
    }
    if (editing) {
      updateService({ id: editing.id, ...data })
    } else {
      addService(data)
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteService(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-barber-gold text-xs tracking-[0.2em] uppercase mb-2">Catálogo</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Serviços</h1>
          <p className="text-barber-muted">{services.length} serviços ativos</p>
        </div>
        <Button size="sm" onClick={openAdd}>+ Novo Serviço</Button>
      </div>

      <div className="grid gap-3">
        {services.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="!p-5">
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
                  <button
                    onClick={() => openEdit(s)}
                    className="p-2.5 rounded-xl text-barber-muted hover:text-barber-gold hover:bg-barber-gold/10 transition-all cursor-pointer"
                    aria-label={`Editar ${s.name}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(s)}
                    className="p-2.5 rounded-xl text-barber-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    aria-label={`Excluir ${s.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar Serviço' : 'Novo Serviço'}
        footer={<ModalActions onCancel={() => setModalOpen(false)} onConfirm={handleSave} confirmLabel={editing ? 'Salvar' : 'Criar'} />}
      >
        <FormField label="Nome">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Preço (R$)">
            <input type="number" className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </FormField>
          <FormField label="Duração (min)">
            <input type="number" className={inputClass} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Ícone (emoji)">
          <input className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} maxLength={2} />
        </FormField>
        <FormField label="Descrição">
          <textarea className={`${inputClass} resize-none h-20`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </FormField>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-barber-gold" />
          Marcar como popular
        </label>
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Excluir serviço"
        footer={<ModalActions onCancel={() => setDeleteConfirm(null)} onConfirm={handleDelete} confirmLabel="Excluir" danger />}
      >
        <p className="text-sm text-barber-muted">
          Tem certeza que deseja excluir <strong className="text-barber-cream">{deleteConfirm?.name}</strong>? Esta ação não pode ser desfeita.
        </p>
      </Modal>
    </div>
  )
}
