<script setup lang="ts">
import UserIcon from '@/assets/user.svg?component'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router'

const router = useRouter();
const authStore = useAuthStore()

const menuRef = ref(null)
const userRef = ref(null)

onClickOutside(menuRef, () => isMenuOpen.value = false, { ignore: [userRef] })

const isMenuOpen = ref<boolean>(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = async () => {
  authStore.removeToken();
  await router.push({ name: ROUTE_NAMES.Landing })
}
</script>

<template>
  <div class="header">
    <div class="logo">
      Alarmu
    </div>
    <div
      ref="userRef"
      class="user"
      @click="toggleMenu"
    >
      <UserIcon />
    </div>
    <div
      v-if="isMenuOpen"
      ref="menuRef"
      class="menu"
    >
      <div
        class="menu-item"
        @click="logout"
      >
        Выйти
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  background-color: var(--color-island-bg);
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}

.user {
  border-radius: 50%;
  background: var(--color-element-bg);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: var(--color-text-white);
    width: 15px;
  }
}

.menu {
  background-color: var(--color-island-bg);
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  position: absolute;
  right: 10px;
  top: calc(100% + 5px);
  width: 200px;
  border-radius: 4px;
}

.menu-item {
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: var(--color-element-bg-hover);
  }
}
</style>
