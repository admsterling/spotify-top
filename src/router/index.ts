import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"
import { store } from '@/store/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: () => {
      return (!store.getters.isLoggedIn) ? { path: '/' } : true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
