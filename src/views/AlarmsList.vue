vue
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
        v-for="(alarm, index) in alarms"
        :key="index"
        :time="alarm.time"
        :label="alarm.label"
        :active="alarm.active"
        @update:active="(value) => updateAlarm(index, value)"
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
<script lang="ts">
import AlarmItem from '@/components/AlarmItem.vue'

interface AlarmsData {
  alarms: Alarm[]
}

export default {
  components: {
    AlarmItem,
  },
  data(): AlarmsData {
    return {
      alarms: [],
    }
  },
  methods: {
    updateAlarm(index: number, value: boolean) {
      this.alarms[index].active = value
    },
  },
}
</script>
