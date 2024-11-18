<template>
  <div>
    <div class="header">
      <h1>My Alarms</h1>
      <div class="buttons">
        <button class="button" @click="$router.push({name: ROUTE_NAMES.Alarm})">New alarm</button>
      </div>
    </div>

    <div class="alarms">
      <AlarmItem
        v-for="alarm in store.alarms"
        :key="alarm.id"
        :alarm="alarm"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alarms {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
.buttons {
  display: flex;
  gap: 10px;
}
</style>
<script lang="ts" setup>
import AlarmItem from '@/components/AlarmItem.vue'
import { useAppStore } from '@/stores/app'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { ROUTE_NAMES } from '@/router'

useTitle('My alarms')

const store = useAppStore()

onMounted(() => {
  store.getAlarms()
})
</script>
