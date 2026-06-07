import Card from './Card'

export default function StatCard({ icon: Icon, label, value, change, accent = 'gold' }) {
  const accents = {
    gold: 'bg-barber-gold/15 text-barber-gold',
    green: 'bg-emerald-500/15 text-emerald-400',
    red: 'bg-red-500/15 text-red-400',
    amber: 'bg-amber-500/15 text-amber-400',
  }

  return (
    <Card className="!p-5 min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-barber-muted text-xs uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold truncate">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
              {change} vs mês anterior
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${accents[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  )
}
