import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'
import Drone from '../views/drone/index.vue'
import Engineer from '../views/engineer/index.vue'
import Hero from '../views/hero/index.vue'
import InfantryFirst from '../views/infantryFirst/index.vue'
import InfantrySecond from '../views/infantrySecond/index.vue'
import Setting from '../views/setting/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
    },
    {
      path: '/drone',
      name: 'drone',
      component: Drone,
    },
    {
      path: '/engineer',
      name: 'engineer',
      component: Engineer,
    },
    {
      path: '/hero',
      name: 'hero',
      component: Hero,
    },
    {
      path: '/infantry1',
      name: 'infantry1',
      component: InfantryFirst,
    },
    {
      path: '/infantry2',
      name: 'infantry2',
      component: InfantrySecond,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    }
  ],
})

export default router
