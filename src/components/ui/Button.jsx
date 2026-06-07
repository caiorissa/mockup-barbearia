export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const variants = {
    primary:
      'bg-barber-gold text-barber-dark hover:bg-barber-gold-light',
    secondary:
      'bg-transparent border border-barber-gold/50 text-barber-gold hover:bg-barber-gold/10 hover:border-barber-gold',
    danger:
      'bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-600/30',
    ghost:
      'bg-white/5 text-barber-cream hover:bg-white/10 border border-transparent',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  )
}
