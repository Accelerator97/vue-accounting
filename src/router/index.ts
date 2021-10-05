import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue'
import EditDetail from '@/views/EditDetail.vue'
import Label from '@/views/Label.vue'
import Detail from '@/views/Detail.vue'
import DetailItem from '@/views/DetailItem.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'
import AddLabel from '@/views/AddLabel.vue'

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
    path: '/label',
    component: Label
  },
  {
    path: '/label/edit/:id',
    component:EditLabel
  },
  {
    path: '/label/add',
    component:AddLabel
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/detail/item',
    component: DetailItem,
  },
  {
    path: '/editdetail',
    component: EditDetail,
  },
  {
    path: '/statistics',
    component:Statistics
  },

  {
    path: '*',
    component:NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
