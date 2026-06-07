import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Booking from './pages/Booking'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Schedules from './pages/admin/Schedules'
import ProfessionalsAdmin from './pages/admin/Professionals'
import ServicesAdmin from './pages/admin/ServicesAdmin'
import Cancellations from './pages/admin/Cancellations'
import NoShows from './pages/admin/NoShows'
import Reports from './pages/admin/Reports'

function PublicLayout({ children }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const isBooking = location.pathname === '/agendar'

  if (isAdmin) return children

  return (
    <div className="w-full overflow-x-clip">
      <Navbar />
      <main className="w-full overflow-x-clip">{children}</main>
      {!isBooking && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PublicLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<Booking />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="horarios" element={<Schedules />} />
            <Route path="profissionais" element={<ProfessionalsAdmin />} />
            <Route path="servicos" element={<ServicesAdmin />} />
            <Route path="cancelamentos" element={<Cancellations />} />
            <Route path="no-shows" element={<NoShows />} />
            <Route path="relatorios" element={<Reports />} />
          </Route>
        </Routes>
      </PublicLayout>
    </BrowserRouter>
  )
}
