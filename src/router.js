import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'
import Welcome from './views/Welcome.vue'
const Draw = () => import('./views/Draw')
const Gallery = () => import('./views/Gallery')
const Notifications = () => import('./views/Notifications')


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw,
      meta: { requiresAuth: true }
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      meta: { requiresAuth: true }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications,
      meta: { requiresAuth: true }
    },
  ]
})
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/gallery');
  } else {
    next();
  }
});
export default router