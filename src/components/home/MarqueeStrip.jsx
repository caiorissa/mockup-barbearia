const items = [
  'Corte Clássico', 'Barba Premium', 'Degradê', 'Navalha', 'Hidratação',
  'Toalha Quente', 'Produtos Importados', 'Agendamento Online',
]

export default function MarqueeStrip() {
  const track = [...items, ...items]

  return (
    <div className="w-full py-4 border-y border-white/[0.06] bg-barber-surface overflow-hidden">
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <span key={i} className="flex items-center px-6 text-sm text-barber-muted whitespace-nowrap">
            <span className="text-barber-gold mr-6">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
