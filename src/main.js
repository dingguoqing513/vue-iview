import Vue from 'vue'
import App from './App'
import iView from 'iview' // 引入iView
import 'iview/dist/styles/iview.css' // 引入iView css
import router from './router'
import '../static/main.css' // 引入公共样式

Vue.config.productionTip = false
Vue.use(iView)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
