import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router, { ROUTE_NAMES } from '@/router'
import type { Alarm } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(function(config) {
  const { token } = useAuthStore()
  config.headers.Authorization = token

  return config
})

api.interceptors.response.use(response => {
  return response;
}, error => {
  const {removeToken} = useAuthStore()
  if (error.response?.status === 401) {
    removeToken()
    router.push({ name: ROUTE_NAMES.Auth })
  }
  return error;
})

const login = async (phone: string, code?: string): Promise<string> => {
  return await api.post('/auth/login', {
    phone,
    code
  })
    .then(res => (res.data.token))
}

const getAlarms = async (): Promise<Alarm[]> => {
  return await api.get('/alarms')
    .then(res => res.data?.data)
}

const getAlarm = async (id: string): Promise<Alarm> => {
  return await api.get('/alarms/' + id)
    .then(res => res.data?.data)
}

const createAlarm = async (time: string, name?: string): Promise<Alarm> => {
  return await api.post('/alarms', {
    time,
    name
  })
    .then(res => (res.data.data))
}

const updateAlarm = async (alarm: Alarm): Promise<Alarm> => {
  return await api.post('/alarms/'+ alarm.id, alarm)
    .then(res => (res.data.data))
}

const deleteAlarm = async (alarmId: string): Promise<boolean> => {
  return await api.delete('/alarms/' + alarmId)
    .then(res => (res.data.success));
}

export default {
  login,
  getAlarm,
  getAlarms,
  createAlarm,
  updateAlarm,
  deleteAlarm
}
