import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import api from '@/api'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const isCodeSent = ref<boolean>(false)

    const isLoggedIn = computed(() => {
      if (!token.value) {
        return false
      }
      try {
        jwtDecode(token.value)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    })

    const user = computed(() => {
      if (!token.value) return null

      return jwtDecode<JwtPayload>(token.value)
    })

    const removeToken = (): void => {
      token.value = null
    }

    const setIsCodeSent = (value: boolean): void => {
      isCodeSent.value = value
    }

    const login = async (phone: string, code?: string) => {
      try {
        token.value = await api.login(phone, code)
      } catch (error) {
        return error
      }
    }

    return { login, isCodeSent, setIsCodeSent, token, isLoggedIn, user, removeToken }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
