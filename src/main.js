import Vue from 'vue'
import App from './App'
import iView from 'iview' // 引入iView
import 'iview/dist/styles/iview.css' // 引入iView css
import router from './router'
import '../static/main.css' // 引入公共样式
import filters from './utils/filter'
import axios from 'axios'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);


Vue.config.productionTip = false
// Vue.component('chart', ECharts)
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