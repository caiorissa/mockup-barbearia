export default function Card({ children, className = '', onClick, glow = false }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative bg-barber-card rounded-2xl p-6
        border border-white/[0.06]
        transition-colors duration-300
        ${glow ? 'border-barber-gold/20' : ''}
        ${onClick ? 'cursor-pointer hover:border-barber-gold/25' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
