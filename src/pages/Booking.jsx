import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { timeSlots } from '../data/mockData'
import { useBarberStore } from '../context/BarberStoreContext'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import {
  Check, ChevronRight, ChevronLeft, Clock, Star, ArrowLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = ['Serviço', 'Profissional', 'Horário', 'Confirmar']

export default function Booking() {
  const { services, professionals, addAppointment, isSlotAvailable } = useBarberStore()
  const [step, setStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState({
    service: null,
    professional: null,
    time: null,
    date: '',
    client: '',
    phone: '',
  })

  const canNext = () => {
    if (step === 0) return selected.service
    if (step === 1) return selected.professional
    if (step === 2) return selected.date && selected.time && selected.client.trim() && selected.phone.trim()
    return true
  }

  const reset = () => {
    setConfirmed(false)
    setStep(0)
    setError('')
    setSelected({ service: null, professional: null, time: null, date: '', client: '', phone: '' })
  }

  const handleConfirm = () => {
    const available = isSlotAvailable({
      professionalName: selected.professional.name,
      date: selected.date,
      time: selected.time,
    })
    if (!available) {
      setError('Este horário acabou de ser reservado. Escolha outro.')
      setStep(2)
      return
    }

    addAppointment({
      client: selected.client.trim(),
      phone: selected.phone.trim(),
      service: selected.service.name,
      professional: selected.professional.name,
      date: selected.date,
      time: selected.time,
    })
    setConfirmed(true)
    setError('')
  }

  const isTimeTaken = (time) =>
    selected.professional &&
    selected.date &&
    !isSlotAvailable({
      professionalName: selected.professional.name,
      date: selected.date,
      time,
    })

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="w-full py-28 pb-12">
      <Container className="!max-w-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-barber-muted hover:text-barber-cream mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>

        <div className="bg-barber-card border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
            <p className="text-barber-gold text-xs font-medium tracking-widest uppercase mb-1">
              Reserva online
            </p>
            <h1 className="font-display text-2xl font-bold">Agendar Horário</h1>
            <p className="text-barber-muted text-sm mt-1">
              Passo {step + 1} de {steps.length} — {steps[step]}
            </p>
            <div className="flex gap-2 mt-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? 'bg-barber-gold' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-5">
            {error && (
              <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 0 && (
                    <div className="space-y-2">
                      {services.map((s) => {
                        const isSelected = selected.service?.id === s.id
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelected({ ...selected, service: s })}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-barber-gold/10 border border-barber-gold/40'
                                : 'bg-barber-elevated border border-white/[0.06] hover:border-white/10'
                            }`}
                          >
                            <span className="text-xl shrink-0">{s.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">{s.name}</p>
                              <p className="text-barber-muted text-xs flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {s.duration} min
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-barber-gold shrink-0">
                              R$ {s.price}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-2">
                      {professionals.filter((p) => p.available).map((p) => {
                        const isSelected = selected.professional?.id === p.id
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelected({ ...selected, professional: p })}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-barber-gold/10 border border-barber-gold/40'
                                : 'bg-barber-elevated border border-white/[0.06] hover:border-white/10'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-barber-gold/15 flex items-center justify-center text-sm font-semibold text-barber-gold shrink-0">
                              {p.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold">{p.name}</p>
                              <p className="text-barber-muted text-xs">{p.role}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <Star className="w-3 h-3 text-barber-gold fill-barber-gold" />
                              <span className="text-xs text-barber-muted">{p.rating}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-xs text-barber-muted font-medium mb-2 block">Seu nome</label>
                        <input
                          type="text"
                          value={selected.client}
                          onChange={(e) => setSelected({ ...selected, client: e.target.value })}
                          placeholder="Nome completo"
                          className="w-full bg-barber-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-barber-cream focus:border-barber-gold/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-barber-muted font-medium mb-2 block">Telefone</label>
                        <input
                          type="tel"
                          value={selected.phone}
                          onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
                          placeholder="(11) 99999-0000"
                          className="w-full bg-barber-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-barber-cream focus:border-barber-gold/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-barber-muted font-medium mb-2 block">Data</label>
                        <input
                          type="date"
                          min={today}
                          value={selected.date}
                          onChange={(e) => setSelected({ ...selected, date: e.target.value, time: null })}
                          className="w-full bg-barber-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-barber-cream focus:border-barber-gold/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-barber-muted font-medium mb-2 block">Horário</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((t) => {
                            const taken = isTimeTaken(t)
                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={taken}
                                onClick={() => setSelected({ ...selected, time: t })}
                                className={`py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                                  selected.time === t
                                    ? 'bg-barber-gold text-barber-dark'
                                    : taken
                                      ? 'bg-barber-elevated text-barber-muted border border-white/[0.04]'
                                      : 'bg-barber-elevated text-barber-cream border border-white/[0.06] hover:border-barber-gold/30'
                                }`}
                              >
                                {t}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-0">
                      {[
                        { label: 'Cliente', value: selected.client },
                        { label: 'Telefone', value: selected.phone },
                        { label: 'Serviço', value: selected.service?.name },
                        { label: 'Profissional', value: selected.professional?.name },
                        { label: 'Data', value: selected.date },
                        { label: 'Horário', value: selected.time },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between py-3 border-b border-white/[0.05] text-sm"
                        >
                          <span className="text-barber-muted">{row.label}</span>
                          <span className="font-medium">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-barber-muted text-sm">Total</span>
                        <span className="text-xl font-semibold text-barber-gold">
                          R$ {selected.service?.price}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Check className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-xl font-bold mb-1">Confirmado!</h2>
                  <p className="text-barber-muted text-sm mb-1">
                    {selected.service?.name} · {selected.professional?.name}
                  </p>
                  <p className="text-barber-gold text-sm mb-2">
                    {selected.date} às {selected.time}
                  </p>
                  <p className="text-barber-muted text-xs mb-6">
                    Seu agendamento já aparece no painel admin em tempo real.
                  </p>
                  <Button onClick={reset} className="w-full">Novo Agendamento</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!confirmed && (
            <div className="px-6 py-4 border-t border-white/[0.06] flex justify-between gap-3">
              {step > 0 ? (
                <Button variant="ghost" size="sm" onClick={() => { setStep(step - 1); setError('') }}>
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </Button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <Button size="sm" onClick={() => { setError(''); setStep(step + 1) }} disabled={!canNext()}>
                  Próximo <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleConfirm}>
                  Confirmar
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
