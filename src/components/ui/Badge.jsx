export default function Badge({ children, variant = 'default', dot = false }) {
  const variants = {
    default: 'bg-barber-gold/15 text-barber-gold border border-barber-gold/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    muted: 'bg-white/5 text-barber-muted border border-white/5',
  }

  const dotColors = {
    default: 'bg-barber-gold',
    success: 'bg-emerald-400',
    danger: 'bg-red-400',
    warning: 'bg-amber-400',
    muted: 'bg-barber-muted',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}
