import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BarberStoreProvider } from './context/BarberStoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BarberStoreProvider>
      <App />
    </BarberStoreProvider>
  </StrictMode>,
)
