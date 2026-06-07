import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import PageTransition from '../../components/ui/PageTransition'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-barber-dark">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-auto lg:ml-0 pt-20 lg:pt-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}
