import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import FormItem from '@/components/FormItem.vue'
Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)
Vue.component('FormItem', FormItem)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// window.addEventListener("load",function() {
//   setTimeout(function(){
//       // This hides the address bar:
//       window.scrollTo(0, 1);
//   }, 0);
// });

function safariHacks() {
  const windowsVH = window.innerHeight / 100;
  const layoutWrapper = document.querySelector('.layout-wrapper') as HTMLElement
  layoutWrapper.style.setProperty('--vh', windowsVH + 'px');
  window.addEventListener('resize', function() {
    layoutWrapper.style.setProperty('--vh', windowsVH + 'px');
  });
}

safariHacks();