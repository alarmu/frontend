<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFocus, useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router'
import axios from 'axios'
import VSpinner from '@/components/VSpinner.vue'
import { vMaska } from "maska/vue"
import { isValidPhoneNumber } from 'libphonenumber-js'

useTitle('Login')

const authStore = useAuthStore()

const router = useRouter();

const phoneInputRef = ref<HTMLInputElement>()
const codeInputRef = ref<HTMLInputElement>()
const phone = ref('')
const code = ref('')
const loading = ref(false)
const errorMessage = ref<string|null>(null)
const toast = useToast();

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: ROUTE_NAMES.Alarms })
  }
  useFocus(phoneInputRef, { initialValue: true })
})

const { focused: codeFocused } = useFocus(codeInputRef)

const send = async () => {
  loading.value = true
  if (authStore.isCodeSent) {
    codeInputRef.value?.focus()
  }
  try {
    await authStore.login(phone.value, code.value || undefined)
    if (authStore.isCodeSent && authStore.isLoggedIn) {
      toast.success("Success authorization")
      await router.push({ name: ROUTE_NAMES.Alarms })
    }
    authStore.setIsCodeSent(true)
  } catch (e) {
    if (axios.isAxiosError(e)) {

      errorMessage.value = e.response?.data?.error
      return;
    }
    console.error(e)

    errorMessage.value = 'Authentication error, please try again.';
  } finally {
    loading.value = false
  }
}

const resetError = () => {
  errorMessage.value = null
}

const isValid = computed(() => {
  return isValidPhoneNumber(phone.value, 'RU');
})

watch(
  () => authStore.isCodeSent,
  () => codeFocused.value = true
)
</script>

<template>
  <div class="wrapper">
    <form class="container" @submit.prevent="send">
      <div class="title">Login</div>

      <div v-if="errorMessage" class="alert warning">
        {{ errorMessage }}
      </div>
      <div class="fields">
        <div class="field">
          <input
            v-model="phone"
            type="tel"
            class="input"
            placeholder="+7 ### ###-##-##"
            autocomplete="tel"
            v-maska="'+7 ### ###-##-##'"
            @input="resetError"
            :disabled="authStore.isCodeSent"
          />
        </div>
        <div class="field" v-if="authStore.isCodeSent">
          <input
            ref="codeInputRef"
            type="text"
            v-model="code"
            class="input"
            placeholder="Code"
            autocomplete="one-time-code"
            @input="resetError"
          />
        </div>
      </div>
      <button
        type="submit"
        :class="['button', 'login-button', { loading: loading }]"
        :disabled="loading || !isValid"
      >
        <VSpinner v-if="loading" />
        <template v-else>Login</template>
      </button>
    </form>
  </div>
</template>

<style scoped>
@keyframes appear {
  from {
    transform: translateY(40px);
  }
  to {
    transform: translateY(0);
  }
}
.wrapper {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  @media (max-width: 600px) {
    max-width: unset;
    flex-grow: 1;
  }
}

.container {
  display: flex;
  flex-direction: column;
  padding: 35px;
  border-radius: 16px;
  background: var(--color-island-bg);
  animation: appear 0.3s;
  @media (max-width: 600px) {
    border-radius: 0;
    margin: 0;
    max-width: unset;
    flex-grow: 1;
    justify-content: center;
  }
}

.title {
  color: var(--color-text-white);
  font-size: 27px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input {
  padding: 10px;
  width: 100%;
  font-size: 16px;
}

.login-button {
  margin-top: 30px;
}

.error {
  margin: 10px 0 20px 0;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.alert {
  border: 1px solid #495057;
  padding: 16px;
  color: #f8f9fa;
  background-color: #343a40;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 8px;
  animation: appear 0.3s;
  margin-bottom: 10px;
}
.alert.warning {
  border-color: #997404;
  background-color: #332701;
  color: #ffda6a;
}
.alert.success {
  border-color: #0f5132;
  background-color: #051b11;
  color: #75b798;
}
</style>
