import { experience } from '../../data/mockData'
import SectionHeader from '../ui/SectionHeader'
import Container from '../ui/Container'

export default function Experience() {
  return (
    <section id="experiencia" className="section-anchor w-full py-20 lg:py-24 bg-barber-surface/40">
      <Container>
        <SectionHeader
          label="A experiência"
          title={<>Mais que um <span className="text-gradient-gold font-semibold">corte</span></>}
          subtitle="Cada detalhe foi pensado para transformar sua visita em um momento de puro prazer."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experience.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-barber-card border border-white/[0.06] hover:border-barber-gold/20 transition-colors min-w-0"
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-barber-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
