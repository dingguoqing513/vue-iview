import Vue from 'vue'
import App from './App'
import iView from 'iview' // 引入iView
import 'iview/dist/styles/iview.css' // 引入iView css
import router from './router'
import '../static/main.css' // 引入公共样式
import filters from './utils/filter'
import axios from 'axios'

import ECharts from 'vue-echarts/components/ECharts' // 引入vue-echarts
import 'echarts/lib/chart/line' // 【echarts line】
import 'echarts/lib/chart/pie' // 【echarts pie】
import 'echarts/lib/chart/radar' // 【echarts radar】雷达图
import 'echarts/lib/component/legend' // 【echarts legend】标记功能
import 'echarts/lib/component/tooltip' // 【echarts tooltip】hover

Vue.config.productionTip = false
Vue.component('chart', ECharts)
Object.keys(filters).forEach(opt => Vue.filter(opt, filters[opt]))
Vue.use(iView)
Vue.use(axios)
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})