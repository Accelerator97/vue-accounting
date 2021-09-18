import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/components/Money.vue'
import Label from '@/components/Label.vue'
import Statistics from '@/components/Statistics.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Label
  },
  {
    path: '/statistics',
    component:Statistics
  },
]

const router = new VueRouter({
  routes
})

export default router
