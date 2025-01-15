import { createRouter, createWebHistory } from 'vue-router'
import AuroraForecats from '../views/AuroraForecats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuroraForecats,
    },

  ],
})

export default router
