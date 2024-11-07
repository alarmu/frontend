<script setup lang="ts">

</script>

<template>
  <div class="spinner" />
</template>

<style scoped>
@keyframes spinner-border {
  to { transform: rotate(360deg) }
}
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  border: 2px solid var(--color-text-white);
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: .75s linear infinite spinner-border;
  animation: .75s linear infinite spinner-border;
}
</style>
