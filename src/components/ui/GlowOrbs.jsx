export default function GlowOrbs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-barber-gold/[0.07] rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] bg-barber-burgundy/30 rounded-full blur-[100px] animate-float" />
      <div className="absolute -bottom-24 left-1/3 w-[350px] h-[350px] bg-barber-green/25 rounded-full blur-[90px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
    </div>
  )
}
