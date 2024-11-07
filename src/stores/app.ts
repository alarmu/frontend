import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useAppStore = defineStore('app', () => {
  const alarms = ref<Alarm[]>([])

  const getAlarms = async () => {
    try {
      alarms.value = await api.getAlarms()
    } catch (error) {
      return error
    }
  }

  return { alarms, getAlarms }
})
