<script setup lang="ts">

import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <page-header />
  <div class="page">
    <router-view />
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1300px) {
    padding: 0 16px;
  }
}
</style>
