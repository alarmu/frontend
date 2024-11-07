vue
<template>
  <div>
    <h1>Edit Alarm</h1>
    <form @submit.prevent="saveAlarm">
      <label for="time">Alarm Time:</label>
      <input type="time" v-model="alarm.time" required />
      <button type="submit">Save</button>
    </form>
    <router-link to="/">Back to Alarms List</router-link>
  </div>
</template>

<script lang="ts">
export default {
  props: ['id'],
  data() {
    return {
      alarm: {
        id: this.id,
        time: '07:00 AM' // default value, you would fetch this based on ID
      }
    }
  },
  methods: {
    saveAlarm() {
      console.log('Alarm saved:', this.alarm);
      // Here you would typically save the alarm to your backend or state management
    }
  }
}
</script>
