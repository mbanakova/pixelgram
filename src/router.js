import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './views/Welcome.vue'
const Draw = () => import('./views/Draw')
const Gallery = () => import('./views/Gallery')


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
  ]
})

export default router