import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import AlarmsList from '@/views/AlarmsList.vue'
import AlarmEdit from '@/views/AlarmEdit.vue'
import AuthView from '@/views/AuthView.vue'
import { useAuthStore } from '@/stores/auth'
import PageLayout from '@/components/PageLayout.vue'

export enum ROUTE_NAMES {
  Landing = 'landing',
  Auth = 'auth',
  Alarms = 'alarms',
  Alarm = 'alarm',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.Landing,
      component: LandingView
    },
    {
      path: '/alarms',
      component: PageLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: ROUTE_NAMES.Alarms,
          component: AlarmsList,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: ':id',
          name: ROUTE_NAMES.Alarm,
          component: AlarmEdit,
          meta: {
            requiresAuth: true
          },
        },
      ]
    },
    {
      path: '/auth',
      name: ROUTE_NAMES.Auth,
      component: AuthView,
      meta: {
        hideForAuth: true
      }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = useAuthStore()

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: ROUTE_NAMES.Auth })
  }

  if (to.meta.hideForAuth && isLoggedIn) {
    return next({ name: ROUTE_NAMES.Alarms });
  }

  next()
})
export default router
