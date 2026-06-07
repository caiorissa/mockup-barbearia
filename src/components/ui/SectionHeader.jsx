export default function SectionHeader({ label, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-12 lg:mb-14 ${alignClass}`}>
      <p className="text-barber-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-barber-muted text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`divider-gold mt-6 w-20 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  )
}
