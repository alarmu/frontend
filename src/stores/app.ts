import { defineStore } from 'pinia'
import api from '@/api'
import type { Alarm } from '@/types'

export const useAppStore = defineStore('app',{
  state: () => {
    return {
      alarms: [] as Alarm[],
    }
  },
  actions: {
    async getAlarms()  {
      this.alarms = await api.getAlarms()
    },
    async setAlarmState(id: string, state: boolean)  {
      const alarmIndex = this.alarms.findIndex((x) => x.id === id)
      this.alarms[alarmIndex].active = state

      // await api.getAlarms()
    }
  }
})
