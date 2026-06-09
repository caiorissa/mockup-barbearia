import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-barber-card border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 id="modal-title" className="font-display text-lg font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-barber-muted hover:text-barber-cream hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && (
              <div className="px-6 py-4 border-t border-white/[0.06] flex justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function FormField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="text-xs text-barber-muted font-medium mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}

export const inputClass =
  'w-full bg-barber-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-barber-cream focus:border-barber-gold/50 focus:outline-none'

export function ModalActions({ onCancel, onConfirm, confirmLabel = 'Salvar', danger = false }) {
  return (
    <>
      <Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button>
      <Button variant={danger ? 'danger' : 'primary'} size="sm" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </>
  )
}
