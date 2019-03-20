import Vue from 'vue'
import App from './App'
import iView from 'iview' // 引入iView
import 'iview/dist/styles/iview.css' // 引入iView css
import router from './router'
import '../static/main.css' // 引入公共样式
import ECharts from 'vue-echarts/components/ECharts' // 引入vue-echarts
import 'echarts/lib/chart/line' // 按需引入-【echarts line】

Vue.config.productionTip = false
Vue.component('chart', ECharts)
Vue.use(iView)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
