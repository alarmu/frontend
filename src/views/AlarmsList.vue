<template>
  <div>
    <div class="header">
      <h1>My Alarms</h1>
      <div class="buttons">
        <button class="button">New alarm</button>
      </div>
    </div>

    <div class="alarms">
      <AlarmItem
        v-for="alarm in alarms"
        :key="alarm.id"
        :time="alarm.time"
        :label="alarm.label ?? undefined"
        :active="alarm.active"
        @update:active="(value) => updateAlarm(alarm.id, value)"
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
import { computed } from 'vue'

const store = useAppStore()
const alarms = computed(() => store.alarms)

store.getAlarms()

const updateAlarm = (id: string, value: boolean) => {
  store.setAlarmState(id, value);
}
</script>
