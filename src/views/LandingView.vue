vue
<template>
  <div class="landing-page">
    <div class="main">
      <div class="headline">
        Welcome to Alarmu
      </div>
      <h1 class="title">
        Your smart solution for managing alarms and reminders
      </h1>
      <div class="subtitle">
        With Alarmu, you can set multiple alarms and alarmu call you on time to wake you up
      </div>

      <div
        class="buttons"
      >
        <router-link
          :to="{name: authStore.isLoggedIn ? ROUTE_NAMES.Alarms: ROUTE_NAMES.Auth}"
          class="cta"
        >
          {{ authStore.isLoggedIn ? 'To my alarms' : 'Get Started' }}
        </router-link>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Alarmu. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { ROUTE_NAMES } from '@/router/index.js'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LandingPage',
  methods: {
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES
    },
    ...mapStores(useAuthStore),
  },
}
</script>

<style scoped>

.landing-page {
  background: #fff;
  color: #000;
  text-align: center;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main {
  background-color: #F4F4F4;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 96px;
  padding-top: 96px;
  border-radius: 0.8125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  @media (max-width: 600px) {
    margin: 20px;
    padding: 40px 0;
  }
  background-image: linear-gradient(to bottom right, #FBD7FF 10%, #FFDEC1 80%);
  .subtitle {
    font-size: 18px;
    margin-top: 12px;
    text-align: center;
  }
  .buttons {
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 600px) {
      flex-direction: column;
    }

    .cta {
      background: rgb(231, 231, 231);
      color: #000;
      text-decoration: none;
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 5px;
      text-align: center;
      @media (max-width: 600px) {
        width: 100%;
      }
      &:hover {
        background-color: #D5D5D5;
      }
    }
  }
}

.footer {
  margin-top: 20px;
  font-size: 14px;
}
</style>
