<div align="center">

# ✂️ Gentleman's Cut

**Mockup de barbearia premium para portfólio**

Site fictício com landing page, fluxo de agendamento e painel administrativo completo.

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br />

[Demo](#-rotas) · [Instalação](#-instalação) · [Estrutura](#-estrutura-do-projeto) · [Painel Admin](#-painel-administrativo)

</div>

---

## 📌 Sobre o projeto

O **Gentleman's Cut** é um mockup front-end de uma barbearia fictícia em São Paulo. O objetivo é demonstrar habilidades em **React**, **UI/UX**, **componentização** e **design responsivo** — ideal para portfólio.

O projeto é **100% front-end**, com dados mockados. Não há backend nem banco de dados.

### Destaques

- Landing page com hero, serviços, equipe, depoimentos e CTA
- Agendamento online em 4 passos (serviço → profissional → horário → confirmação)
- Painel admin com dashboard, gráficos e gestão operacional
- Tema escuro premium (dourado + preto)
- Layout responsivo (mobile e desktop)
- Animações suaves com Framer Motion

---

## 🖥️ Preview

> Adicione aqui prints ou um GIF do projeto após o deploy.

```
/public          → Landing page
/agendar         → Fluxo de agendamento
/admin           → Painel administrativo
```

---

## 🛠️ Tecnologias

| Categoria | Stack |
|-----------|-------|
| Framework | [React 19](https://react.dev/) |
| Build | [Vite 8](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) |
| Roteamento | [React Router 7](https://reactrouter.com/) |
| Animações | [Framer Motion](https://www.framer.com/motion/) |
| Gráficos | [Recharts](https://recharts.org/) |
| Ícones | [Lucide React](https://lucide.dev/) |

---

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/caiorissa/mockup-barbearia.git

# Entre na pasta
cd mockup-barbearia

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Outros comandos

```bash
npm run build    # Gera build de produção
npm run preview  # Preview da build
npm run lint     # Executa o ESLint
```

---

## 🗺️ Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page |
| `/agendar` | Agendamento online |
| `/admin` | Dashboard |
| `/admin/horarios` | Grade de horários |
| `/admin/profissionais` | Equipe |
| `/admin/servicos` | Catálogo de serviços |
| `/admin/cancelamentos` | Cancelamentos |
| `/admin/no-shows` | No-shows |
| `/admin/relatorios` | Relatórios mensais |

---

## 📊 Painel administrativo

O painel simula a gestão de uma barbearia real:

- **Dashboard** — receita, agendamentos, cancelamentos e no-shows
- **Horários** — disponibilidade por profissional
- **Profissionais** — equipe, especialidades e status
- **Serviços** — catálogo com preços e duração
- **Cancelamentos** — histórico de cancelamentos
- **No-shows** — clientes que não compareceram
- **Relatórios** — gráficos de receita e performance mensal

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── home/          # Seções da landing page
│   ├── layout/        # Navbar, Footer, Sidebar
│   └── ui/            # Componentes reutilizáveis
├── data/
│   └── mockData.js    # Dados fictícios
├── hooks/
├── pages/
│   ├── admin/         # Páginas do painel
│   ├── Booking.jsx    # Agendamento
│   └── Home.jsx       # Landing page
├── App.jsx            # Rotas
├── index.css          # Estilos globais + Tailwind
└── main.jsx
```

---

## 🎨 Design system

| Token | Cor | Uso |
|-------|-----|-----|
| `barber-dark` | `#080808` | Fundo principal |
| `barber-card` | `#141414` | Cards e painéis |
| `barber-gold` | `#d4af37` | Destaques e CTAs |
| `barber-cream` | `#f8f4ee` | Texto principal |
| `barber-muted` | `#6b6b6b` | Texto secundário |

**Tipografia**

- Títulos: **Outfit**
- Corpo: **DM Sans**

---

## 🔮 Próximos passos (ideias)

- [ ] Deploy na Vercel ou Netlify
- [ ] Screenshots e GIF no README
- [ ] Modo claro (light mode)
- [ ] Persistência com `localStorage`
- [ ] Integração com API real

---

## 📄 Licença

Projeto open source para fins de portfólio e estudo. Sinta-se livre para usar como referência.

---

<div align="center">

Feito com ☕ e React

**Gentleman's Cut** — Mockup para portfólio · 2026

</div>
