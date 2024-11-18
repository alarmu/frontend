<template>
  <div>
    <router-link :to="{ name: ROUTE_NAMES.Alarms }" class="back">← Back to Alarms List</router-link>
    <div class="header">
      <h1>Alarm</h1>
      <div class="buttons">
        <button class="button" v-if="alarm">Delete</button>
      </div>
    </div>
    <form @submit.prevent="saveAlarm" v-if="alarm">
      <label for="time">Alarm Time:</label>
      <input type="time" v-model="alarm.time" required />
      <button type="submit">Save</button>
    </form>
    <VSpinner v-if="loading"></VSpinner>
    <p v-if="!loading && !alarm">Alarm not found</p>
  </div>
</template>

<script lang="ts">
import { ROUTE_NAMES } from '@/router'
import api from '@/api'
import type { Alarm } from '@/types'
import VSpinner from '@/components/VSpinner.vue'
import { defineComponent } from 'vue'

interface AlarmEditData {
  alarm: Alarm | null
  loading: boolean
}

export default defineComponent({
  components: { VSpinner },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES
    },
  },
  mounted() {
    this.loading = true
    api
      .getAlarm(this.$route.params.id as string)
      .then((alarm) => {
        this.alarm = alarm
      })
      .finally(() => {
        this.loading = false
      })
  },
  data(): AlarmEditData {
    return {
      alarm: null,
      loading: false,
    }
  },
  methods: {
    saveAlarm() {
      if (!this.alarm) {
        return
      }
      api.createAlarm(this.alarm.time, this.alarm.name || undefined).then(() => {
        this.$router.push({ name: ROUTE_NAMES.Alarms })
      })
    },
  },
})
</script>
<style scoped>
.back {
  margin: 20px 0;
  display: inline-block;
  color: var(--color-text-white);
  text-decoration: none;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
  gap: 10px;
}
</style>
