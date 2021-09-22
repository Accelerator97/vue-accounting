import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import FormItem from '@/components/FormItem.vue'
import { tagsListModel } from './models/tagsListModel'
Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)  
Vue.component('Icon',Icon)
Vue.component('FormItem',FormItem)

window.tagList = tagsListModel.fetch()
window.findTag = (id:string) => {
  return window.tagList.filter(t=> t.id === id)[0]
}
window.createTag = (name:string) => {
  const message = tagsListModel.create(name)
  if(message === 'duplicated'){
    window.alert('标签名重复')
  }else if (message === 'success'){
    window.alert
  }
}
window.removeTag = (id:string) =>{
    return tagsListModel.remove(id)
}
window.updateTag = (id:string,name:string) => {
  return tagsListModel.update(id,name)

}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
