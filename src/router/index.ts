import { createRouter, createWebHistory } from 'vue-router'
import MobileView from '../views/MobileView.vue'
import PcView from '../views/PcView.vue'

const routes = [
  {
    path: '/mobile',
    name: 'Mobile',
    component: MobileView
  },
  {
    path: '/pc',
    name: 'PC',
    component: PcView
  },
  {
    path: '/',
    redirect: '/mobile' // デフォルトはスマホ用ページ
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
