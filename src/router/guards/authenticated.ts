import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { ROUTE_NAMES } from '@/router'

/**
 * если нет токена, перекидывает на логин
 */
export default function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const store = useAuthStore()

  if (store.isLoggedIn) {
    if (to.name === ROUTE_NAMES.Auth) {
      return next({
        name: ROUTE_NAMES.Alarms,
      });
    }
    return next();
  }

  return next({
    name: ROUTE_NAMES.Auth,
  });
}
