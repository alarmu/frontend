<template>
  <router-link class="alarm-item" :to="{name: ROUTE_NAMES.Alarm, params: {id: props.alarm.id}}">
    <div class="alarm-details">
      <h2 class="alarm-time">{{ formattedTime }}</h2>
      <p class="alarm-label">{{ props.alarm.name }}</p>
    </div>
    <div class="alarm-toggle" @click.prevent="toggleActive">
      <input type="checkbox" :value="props.alarm.active" />
      <span class="toggle-slider" :class="{ active: props.alarm.active }"></span>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { Alarm } from '@/types'
import { ROUTE_NAMES } from '@/router'

interface Props {
  alarm: Alarm
}

const props = defineProps<Props>()

const formattedTime = computed(() =>  {
  const date = new Date(`1970-01-01T${props.alarm.time}`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
})

const store = useAppStore()
const toggleActive = () => {
  store.setAlarmState(props.alarm.id, !props.alarm.active);
}
</script>

<style scoped>
.alarm-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  background-color: var(--color-element-bg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  text-decoration: none;
  color: #fff
}

.alarm-item:hover {
  background-color: var(--color-element-bg-hover);
}

.alarm-details {
  flex: 1;
}

.alarm-time {
  font-size: 24px;
  font-weight: bold;
}

.alarm-label {
  font-size: 16px;
  color: #777;
}

.alarm-toggle {
  position: relative;
}

.alarm-toggle input {
  display: none;
}

.toggle-slider {
  display: flex;
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-slider.active {
  background-color: #4caf50;
}

.toggle-slider:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-slider.active:before {
  transform: translateX(26px);
}
</style>
