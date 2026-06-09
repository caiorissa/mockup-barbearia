import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  services as defaultServices,
  professionals as defaultProfessionals,
  schedules as defaultSchedules,
  appointments as defaultAppointments,
  monthlyReports as baseMonthlyReports,
} from '../data/mockData'

const STORAGE_KEY = 'barbershop-store-v1'

const SIM_CLIENTS = [
  'Roberto Lima', 'Daniel Costa', 'Eduardo Souza', 'Fabio Martins',
  'Henrique Alves', 'Igor Pires', 'Juliano Rocha', 'Leandro Dias',
]

const SIM_ACTIONS = [
  { type: 'booking', weight: 4 },
  { type: 'cancel', weight: 1 },
  { type: 'revenue', weight: 3 },
]

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* ignore */
  }
  return {
    services: defaultServices,
    professionals: defaultProfessionals,
    schedules: defaultSchedules,
    appointments: defaultAppointments,
    activityLog: buildInitialActivity(defaultAppointments),
    lastUpdated: Date.now(),
  }
}

function buildInitialActivity(appointments) {
  return appointments
    .slice()
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
    .slice(0, 6)
    .map((apt) => ({
      id: `act-${apt.id}`,
      type: apt.status === 'confirmado' ? 'booking' : apt.status === 'cancelado' ? 'cancel' : 'noshow',
      text: formatActivityText(apt),
      time: new Date(`${apt.date}T${apt.time || '12:00'}`).toISOString(),
    }))
}

function formatActivityText(apt) {
  if (apt.status === 'confirmado') return `${apt.client} agendou ${apt.service}`
  if (apt.status === 'cancelado') return `${apt.client} cancelou ${apt.service}`
  return `${apt.client} — no-show em ${apt.service}`
}

function nextId(items) {
  return Math.max(0, ...items.map((i) => i.id)) + 1
}

function getServicePrice(serviceName, services) {
  const match = services.find((s) => s.name === serviceName || serviceName.includes(s.name))
  return match?.price ?? 45
}

function computeMonthlyReports(appointments, services) {
  return baseMonthlyReports.map((base) => {
    if (base.month !== 'Jun') return { ...base }

    const monthApts = appointments.filter((a) => a.date.startsWith('2026-06'))
    const confirmed = monthApts.filter((a) => a.status === 'confirmado')
    const cancelled = monthApts.filter((a) => a.status === 'cancelado')
    const noShows = monthApts.filter((a) => a.status === 'no-show')

    const revenue = confirmed.reduce((sum, apt) => sum + getServicePrice(apt.service, services), 0)

    return {
      month: 'Jun',
      revenue,
      appointments: monthApts.length,
      cancellations: cancelled.length,
      noShows: noShows.length,
    }
  })
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload

    case 'ADD_APPOINTMENT': {
      const apt = action.payload
      const activity = {
        id: `act-${Date.now()}`,
        type: 'booking',
        text: `${apt.client} agendou ${apt.service}`,
        time: new Date().toISOString(),
      }
      return {
        ...state,
        appointments: [apt, ...state.appointments],
        activityLog: [activity, ...state.activityLog].slice(0, 20),
        lastUpdated: Date.now(),
      }
    }

    case 'UPDATE_APPOINTMENT_STATUS': {
      const { id, status } = action.payload
      const apt = state.appointments.find((a) => a.id === id)
      if (!apt) return state
      const updated = state.appointments.map((a) => (a.id === id ? { ...a, status } : a))
      const activity = {
        id: `act-${Date.now()}`,
        type: status === 'cancelado' ? 'cancel' : status === 'no-show' ? 'noshow' : 'booking',
        text: status === 'confirmado' && apt.status !== 'confirmado'
          ? `${apt.client} reagendou ${apt.service}`
          : formatActivityText({ ...apt, status }),
        time: new Date().toISOString(),
      }
      return {
        ...state,
        appointments: updated,
        activityLog: [activity, ...state.activityLog].slice(0, 20),
        lastUpdated: Date.now(),
      }
    }

    case 'ADD_PROFESSIONAL':
      return {
        ...state,
        professionals: [...state.professionals, action.payload],
        activityLog: [{
          id: `act-${Date.now()}`,
          type: 'professional',
          text: `${action.payload.name} adicionado à equipe`,
          time: new Date().toISOString(),
        }, ...state.activityLog].slice(0, 20),
        lastUpdated: Date.now(),
      }

    case 'UPDATE_PROFESSIONAL':
      return {
        ...state,
        professionals: state.professionals.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
        lastUpdated: Date.now(),
      }

    case 'ADD_SERVICE':
      return {
        ...state,
        services: [...state.services, action.payload],
        activityLog: [{
          id: `act-${Date.now()}`,
          type: 'service',
          text: `Serviço "${action.payload.name}" criado`,
          time: new Date().toISOString(),
        }, ...state.activityLog].slice(0, 20),
        lastUpdated: Date.now(),
      }

    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        ),
        lastUpdated: Date.now(),
      }

    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter((s) => s.id !== action.payload),
        lastUpdated: Date.now(),
      }

    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        ),
        lastUpdated: Date.now(),
      }

    case 'SIMULATE_TICK': {
      const { appointment, activity } = action.payload
      let next = { ...state, lastUpdated: Date.now() }

      if (appointment) {
        next.appointments = [appointment, ...state.appointments]
        next.professionals = state.professionals.map((p) =>
          p.name === appointment.professional
            ? { ...p, appointments: (p.appointments || 0) + 1 }
            : p
        )
      }

      if (activity) {
        next.activityLog = [activity, ...state.activityLog].slice(0, 20)
      }

      return next
    }

    case 'RESET':
      return {
        services: defaultServices,
        professionals: defaultProfessionals,
        schedules: defaultSchedules,
        appointments: defaultAppointments,
        activityLog: buildInitialActivity(defaultAppointments),
        lastUpdated: Date.now(),
      }

    default:
      return state
  }
}

const BarberStoreContext = createContext(null)

export function BarberStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState)
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const monthlyReports = useMemo(
    () => computeMonthlyReports(state.appointments, state.services),
    [state.appointments, state.services]
  )

  const addAppointment = useCallback((data) => {
    const id = nextId(stateRef.current.appointments)
    dispatch({
      type: 'ADD_APPOINTMENT',
      payload: { id, status: 'confirmado', ...data },
    })
  }, [])

  const updateAppointmentStatus = useCallback((id, status) => {
    dispatch({ type: 'UPDATE_APPOINTMENT_STATUS', payload: { id, status } })
  }, [])

  const isSlotAvailable = useCallback(({ professionalName, date, time, excludeId }) => {
    return !stateRef.current.appointments.some(
      (a) =>
        a.id !== excludeId &&
        a.status === 'confirmado' &&
        a.professional === professionalName &&
        a.date === date &&
        a.time === time
    )
  }, [])

  const addProfessional = useCallback((data) => {
    const id = nextId(stateRef.current.professionals)
    const initials = data.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    dispatch({
      type: 'ADD_PROFESSIONAL',
      payload: {
        id,
        avatar: initials,
        rating: 4.5,
        appointments: 0,
        available: true,
        specialties: data.specialties || [],
        ...data,
      },
    })
  }, [])

  const updateProfessional = useCallback((data) => {
    dispatch({ type: 'UPDATE_PROFESSIONAL', payload: data })
  }, [])

  const addService = useCallback((data) => {
    const id = nextId(stateRef.current.services)
    dispatch({
      type: 'ADD_SERVICE',
      payload: { id, featured: false, icon: '✂️', ...data },
    })
  }, [])

  const updateService = useCallback((data) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: data })
  }, [])

  const deleteService = useCallback((id) => {
    dispatch({ type: 'DELETE_SERVICE', payload: id })
  }, [])

  const updateSchedule = useCallback((data) => {
    dispatch({ type: 'UPDATE_SCHEDULE', payload: data })
  }, [])

  // Simulação em tempo real a cada 6s
  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current
      const roll = Math.random()
      const availablePros = s.professionals.filter((p) => p.available)
      const activeServices = s.services

      if (roll < 0.35 && availablePros.length && activeServices.length) {
        const pro = availablePros[Math.floor(Math.random() * availablePros.length)]
        const service = activeServices[Math.floor(Math.random() * activeServices.length)]
        const client = SIM_CLIENTS[Math.floor(Math.random() * SIM_CLIENTS.length)]
        const today = new Date()
        const dayOffset = Math.floor(Math.random() * 3)
        const date = new Date(today)
        date.setDate(date.getDate() + dayOffset)
        const dateStr = date.toISOString().slice(0, 10)
        const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
        const time = times[Math.floor(Math.random() * times.length)]

        const taken = s.appointments.some(
          (a) =>
            a.status === 'confirmado' &&
            a.professional === pro.name &&
            a.date === dateStr &&
            a.time === time
        )
        if (taken) return

        const id = nextId(s.appointments)
        dispatch({
          type: 'SIMULATE_TICK',
          payload: {
            appointment: {
              id,
              client,
              service: service.name,
              professional: pro.name,
              date: dateStr,
              time,
              status: 'confirmado',
            },
            activity: {
              id: `act-${Date.now()}`,
              type: 'booking',
              text: `${client} agendou ${service.name}`,
              time: new Date().toISOString(),
            },
          },
        })
      } else if (roll < 0.5) {
        const confirmed = s.appointments.filter((a) => a.status === 'confirmado')
        if (confirmed.length > 4 && Math.random() < 0.3) {
          const apt = confirmed[Math.floor(Math.random() * confirmed.length)]
          dispatch({
            type: 'UPDATE_APPOINTMENT_STATUS',
            payload: { id: apt.id, status: 'cancelado' },
          })
        } else {
          const currentRevenue = computeMonthlyReports(s.appointments, s.services).at(-1)?.revenue ?? 0
          dispatch({
            type: 'SIMULATE_TICK',
            payload: {
              activity: {
                id: `act-${Date.now()}`,
                type: 'revenue',
                text: `Receita atualizada — R$ ${currentRevenue.toLocaleString()}`,
                time: new Date().toISOString(),
              },
            },
          })
        }
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      monthlyReports,
      addAppointment,
      updateAppointmentStatus,
      isSlotAvailable,
      addProfessional,
      updateProfessional,
      addService,
      updateService,
      deleteService,
      updateSchedule,
    }),
    [
      state,
      monthlyReports,
      addAppointment,
      updateAppointmentStatus,
      isSlotAvailable,
      addProfessional,
      updateProfessional,
      addService,
      updateService,
      deleteService,
      updateSchedule,
    ]
  )

  return (
    <BarberStoreContext.Provider value={value}>
      {children}
    </BarberStoreContext.Provider>
  )
}

export function useBarberStore() {
  const ctx = useContext(BarberStoreContext)
  if (!ctx) throw new Error('useBarberStore must be used within BarberStoreProvider')
  return ctx
}
