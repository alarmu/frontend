import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import AlarmsList from '@/views/AlarmsList.vue'
import AlarmEdit from '@/views/AlarmEdit.vue'
import AuthView from '@/views/AuthView.vue'
import PageLayout from '@/components/PageLayout.vue'
import authenticated from '@/router/guards/authenticated'

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
      beforeEnter: authenticated,
      children: [
        {
          path: '',
          name: ROUTE_NAMES.Alarms,
          component: AlarmsList,
        },
        {
          path: ':id',
          name: ROUTE_NAMES.Alarm,
          component: AlarmEdit,
        },
      ]
    },
    {
      path: '/auth',
      name: ROUTE_NAMES.Auth,
      component: AuthView,
    },
  ],
})
export default router
