export const services = [
  { id: 1, name: 'Corte Clássico', price: 45, duration: 30, description: 'Corte tradicional com acabamento na navalha e finalização premium.', icon: '✂️', featured: false },
  { id: 2, name: 'Barba Completa', price: 35, duration: 25, description: 'Barba modelada com toalha quente, óleos essenciais e balm artesanal.', icon: '🪒', featured: false },
  { id: 3, name: 'Corte + Barba', price: 70, duration: 50, description: 'Experiência completa para o cavalheiro que não abre mão do melhor.', icon: '👔', featured: true },
  { id: 4, name: 'Degradê Premium', price: 55, duration: 40, description: 'Degradê impecável com design personalizado e contorno definido.', icon: '💈', featured: false },
  { id: 5, name: 'Hidratação Capilar', price: 40, duration: 20, description: 'Tratamento profundo com máscara importada e massagem relaxante.', icon: '💧', featured: false },
  { id: 6, name: 'Sobrancelha', price: 20, duration: 15, description: 'Design e acabamento preciso para harmonizar seu visual.', icon: '👁️', featured: false },
]

export const professionals = [
  { id: 1, name: 'Marcos Silva', role: 'Barbeiro Master', experience: '12 anos', rating: 4.9, avatar: 'MS', specialties: ['Degradê', 'Barba'], available: true, appointments: 1240 },
  { id: 2, name: 'Rafael Costa', role: 'Barbeiro Sênior', experience: '8 anos', rating: 4.8, avatar: 'RC', specialties: ['Corte Clássico', 'Navalha'], available: true, appointments: 890 },
  { id: 3, name: 'Diego Almeida', role: 'Barbeiro', experience: '5 anos', rating: 4.7, avatar: 'DA', specialties: ['Design', 'Hidratação'], available: false, appointments: 520 },
  { id: 4, name: 'Lucas Mendes', role: 'Barbeiro Júnior', experience: '2 anos', rating: 4.6, avatar: 'LM', specialties: ['Corte', 'Sobrancelha'], available: true, appointments: 310 },
]

export const schedules = [
  { id: 1, professionalId: 1, day: 'Segunda', start: '09:00', end: '18:00', breaks: '12:00 – 13:00' },
  { id: 2, professionalId: 1, day: 'Terça', start: '09:00', end: '18:00', breaks: '12:00 – 13:00' },
  { id: 3, professionalId: 1, day: 'Quarta', start: '09:00', end: '18:00', breaks: '12:00 – 13:00' },
  { id: 4, professionalId: 2, day: 'Segunda', start: '10:00', end: '19:00', breaks: '13:00 – 14:00' },
  { id: 5, professionalId: 2, day: 'Quinta', start: '10:00', end: '19:00', breaks: '13:00 – 14:00' },
  { id: 6, professionalId: 3, day: 'Terça', start: '09:00', end: '17:00', breaks: '12:00 – 13:00' },
  { id: 7, professionalId: 4, day: 'Quarta', start: '14:00', end: '20:00', breaks: '17:00 – 17:30' },
]

export const appointments = [
  { id: 1, client: 'João Pedro', service: 'Corte + Barba', professional: 'Marcos Silva', date: '2026-06-08', time: '10:00', status: 'confirmado' },
  { id: 2, client: 'André Lima', service: 'Degradê Premium', professional: 'Rafael Costa', date: '2026-06-08', time: '14:30', status: 'confirmado' },
  { id: 3, client: 'Felipe Santos', service: 'Barba Completa', professional: 'Marcos Silva', date: '2026-06-07', time: '11:00', status: 'cancelado' },
  { id: 4, client: 'Bruno Oliveira', service: 'Corte Clássico', professional: 'Lucas Mendes', date: '2026-06-07', time: '15:00', status: 'no-show' },
  { id: 5, client: 'Carlos Ribeiro', service: 'Hidratação', professional: 'Diego Almeida', date: '2026-06-06', time: '09:30', status: 'cancelado' },
  { id: 6, client: 'Thiago Moura', service: 'Corte + Barba', professional: 'Rafael Costa', date: '2026-06-09', time: '16:00', status: 'confirmado' },
  { id: 7, client: 'Pedro Henrique', service: 'Degradê Premium', professional: 'Marcos Silva', date: '2026-06-09', time: '11:30', status: 'confirmado' },
  { id: 8, client: 'Gustavo Nunes', service: 'Barba Completa', professional: 'Rafael Costa', date: '2026-06-05', time: '17:00', status: 'no-show' },
]

export const monthlyReports = [
  { month: 'Jan', revenue: 12400, appointments: 186, cancellations: 12, noShows: 8 },
  { month: 'Fev', revenue: 13800, appointments: 205, cancellations: 9, noShows: 6 },
  { month: 'Mar', revenue: 15200, appointments: 228, cancellations: 15, noShows: 11 },
  { month: 'Abr', revenue: 14100, appointments: 210, cancellations: 10, noShows: 7 },
  { month: 'Mai', revenue: 16500, appointments: 245, cancellations: 8, noShows: 5 },
  { month: 'Jun', revenue: 8900, appointments: 132, cancellations: 6, noShows: 4 },
]

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

export const testimonials = [
  { id: 1, name: 'Ricardo Alves', role: 'Empresário', text: 'A melhor barbearia de SP. Ambiente impecável, atendimento de primeira e o Marcos é simplesmente um artista com a navalha.', rating: 5 },
  { id: 2, name: 'Fernando Dias', role: 'Advogado', text: 'Vim pelo Instagram e fiquei. O ritual da barba com toalha quente é uma experiência que todo homem deveria ter pelo menos uma vez.', rating: 5 },
  { id: 3, name: 'Matheus Rocha', role: 'Designer', text: 'Agendamento online super prático. O degradê que o Rafael fez foi o melhor que já tive. Já indiquei pra todos os amigos.', rating: 5 },
]

export const experience = [
  { icon: '☕', title: 'Bebida de Cortesia', desc: 'Café especial ou whisky enquanto aguarda' },
  { icon: '🎵', title: 'Ambiente Exclusivo', desc: 'Playlist curada e iluminação premium' },
  { icon: '🧴', title: 'Produtos Importados', desc: 'Linha artesanal de alta performance' },
  { icon: '📱', title: 'Agendamento Online', desc: 'Reserve em segundos, sem fila' },
]
