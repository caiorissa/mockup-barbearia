export default function Tooltip({ label, children, side = 'top' }) {
  const position = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrow = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-barber-elevated border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-barber-elevated border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-barber-elevated border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-barber-elevated border-y-transparent border-l-transparent',
  }

  return (
    <div className="relative inline-flex group/tooltip">
      {children}
      <span
        role="tooltip"
        className={`
          pointer-events-none absolute z-50 ${position[side]}
          px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
          bg-barber-elevated text-barber-cream border border-white/10 shadow-lg
          opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100
          group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100
          transition-all duration-150
        `}
      >
        {label}
        <span className={`absolute w-0 h-0 border-4 ${arrow[side]}`} />
      </span>
    </div>
  )
}
