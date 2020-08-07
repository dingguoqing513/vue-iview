<template>
  <div>
	  <section class="chartSec">
      <t-block name='出勤次数-总览' span="1">
        <ul class="card-ul">
          <li class="card-li" v-for="(opt, index) in lateUser" :key="index">
            <div style="width: 35%;">{{ opt.name }}</div>
            <div style="width: 30%; text-align:center;" :class="opt.time | userLevelState"><Icon :type="opt.level === 2 ? 'md-thumbs-down' : opt.level === 1 ? 'ios-radio-button-on' : opt.level === 0 ? 'md-thumbs-up' : ''" /> {{opt.level | userLevel}}</div>
            <div style="width: 30%; text-align:center;">{{ opt.time }}次</div>
          </li>
        </ul>
      </t-block>
      <t-block name='出勤次数-比例' span="3">
        <section class="flexBox">
          <ul class="card-ul flex3 specCard">
            <li class="card-li" v-for="(opt, index) in lateUser" :key="index">
              <div style="width: 35%;">{{ opt.name }}</div>
              <div style="width: 65%;">
                <Progress :percent="parseInt(opt.time/timeSum * 100)" :stroke-color="opt.time | userLevelColor" status="active"/>
              </div>
            </li>
          </ul>
          <div class="radarChart">
            <highcharts-component id='charts-bubble' :options="options" :styles="styles"></highcharts-component>
          </div>
        </section>
      </t-block>
    </section>

    <section class="chartSec">
      <t-block name='公司营收-实时数据' class="lineBlock" span="1">
        <section style="with: 100%;height:100%;">
          <highcharts-component id='charts-realtime' :options="realOptions" :styles="realStyles"></highcharts-component>
        </section>
      </t-block>
      <t-block name='预算与支出' span="6">
        <highcharts-component id='charts-spider' :options="spiderOptions" :styles="spiderStyles"></highcharts-component>
      </t-block>
      <t-block name='男女人数-占比' span='1'>
        <section class="lateBox">
          <div class="lateMan" v-for="(opt, index) in gardenPercent" :key="index">
            <i-circle :percent="opt.percent" :size="80" trail-color="transparent" :stroke-color="opt.sex === 0 ? '#859efc' : '#ff806b'">
              <span class="demo-circle-inner" style="font-size:24px">{{ opt.sex === 0 ? '男' : '女' }}</span>
            </i-circle>
            <div class="lateManDesc">
              <p>人数: {{opt.laterNum}}人</p>
              <p>占比: {{parseInt(opt.laterNum/opt.totalNum * 100)}}%</p>
            </div>
          </div>
        </section>
      </t-block>
      
    </section>
  </div>
</template>

<script>
import mock from '../../utils/data.js'
import tBlock from '@/components/Public/tBlock.vue'
import Highcharts from 'highcharts/highstock'
import highchartsComponent from '@/components/Public/highcharts.vue'
export default {
  data () {
  	return {
      options: {},
      realOptions: {},
      spiderOptions: {},
      randomFrom: ['微信公众号文章+广告点击收入', '抖音投放广告收入', '今日头条文章点击', '趣头条文章阅读收入', '百家号阅读收入'][(Math.ceil(Math.random() * 5))],
      styles: {
        height: '260px',
        width: '100%',
        margin: '-45px 0 0 0'
      },
      realStyles: {
        width: 'max-content',
        height: '200px',
      },
      spiderStyles: {
        width: '100%',
        height: '95%'
      },
      lateUser: [{
        name: '客服部-李刚',
        level: 2, // 0: 一切正常 1: 一般警告 2: 严重预警
        time: 13
      }, {
        name: '行政部-刘刚机',
        level: 1,
        time: 8
      }, {
        name: '后端部-渣渣辉',
        level: 1,
        time: 6
      }, {
        name: '前端部-帅神',
        level: 0,
        time: 1
      }],
      series: mock.bubbleSeries,
      gardenPercent: [{
        sex: 0, // 0：男 1：女
        laterNum: 35,
        totalNum: 188,
        percent: 0
      }, {
        sex: 1, // 0：男 1：女
        laterNum: 65,
        totalNum: 105,
        percent: 0
      }]
  	}
  },
  computed: {
    timeSum: function() {
      let sum = 0
      this.lateUser.map((item) => {
        sum += item.time
      })
      return sum
    }
  },
  mounted() {
    var that = this
    this.initChart()
    let percentTime = setTimeout(() => {
      this.gardenPercent.forEach((opt) => {
        opt.percent = parseInt(opt.laterNum/opt.totalNum * 100)
      })
    }, 100)

    percentTime = null
  },
  components: {
    tBlock,
    highchartsComponent
  },
  methods: {
  	initChart () {
      this.options = {
        chart: {
          type: 'packedbubble',
          height: '90%'
        },
        title: {
            text: ''
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}: </b>(2019.10.1入职) <br> 本年缺勤 <b><{point.y}></b> 天<br>手机号：18823456789'
        },
        legend: {
          verticalAlign: 'top'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '120%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 150
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: this.series
      }

      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      })
      function activeLastPointToolip(chart) {
          var points = chart.series[0].points;
          chart.tooltip.refresh(points[points.length - 1]);
      }
      this.realOptions = {
        chart: {
          type: 'spline',
          marginRight: 0,
          events: {
            load: function () {
              var series = this.series[0],
                  chart = this;
              activeLastPointToolip(chart);
              setInterval(function () {
                  var x = (new Date()).getTime(), // 当前时间
                      y = Math.random() * 10;          // 随机值
                  series.addPoint([x, y], true, true);
                  activeLastPointToolip(chart);
              }, 1000);
            }
          }
        },
        title: {
            text: '第三方广告推广收入实时数据'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: null
            }
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + '￥' +
                  Highcharts.numberFormat(this.y, 2);
          }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: this.randomFrom,
            data: (function () {
                // 生成随机值
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random() * 10
                    });
                }
                return data;
            }())
        }]
      }

      this.spiderOptions = {
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: '',
          x: 0
        },
        pane: {
          size: '90%'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: ['销售', '市场营销', '发展', '客户支持', '信息技术', '行政管理'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        legend: {
          align: 'right',
          verticalAlign: 'left',
          y: 70,
          x: 15,
          layout: 'vertical'
        },
        series: [{
          name: '预算拨款',
          data: [43000, 19000, 60000, 35000, 17000, 70000],
          pointPlacement: 'on'
        }, {
          name: '实际支出',
          data: [50000, 39000, 42000, 31000, 26000, 14000],
          pointPlacement: 'on'
        }]
      }

      // 将当前角度信息同步到 DOM 中
      var alphaValue = document.getElementById('alpha-value'),
          betaValue = document.getElementById('beta-value'),
          depthValue = document.getElementById('depth-value');
      function showValues() {
          alphaValue.innerHTML = chart.options.chart.options3d.alpha;
          betaValue.innerHTML = chart.options.chart.options3d.beta;
          depthValue.innerHTML = chart.options.chart.options3d.depth;
      }

      var chartsBubble = Highcharts.chart('charts-bubble', this.options);
      var chartsRealtime = Highcharts.chart('charts-realtime', this.realOptions);
      var chartsSpider = Highcharts.chart('charts-spider', this.spiderOptions);

      let pieData = mock.cardData[0].detailList.map(opt => {
      	return { name: opt.name, value: opt.num }
      })
    }
  }
}
</script>

<style>
  .chartSec {
  	display: flex;
  }

  .flexBox {
    display: flex;
    height: 100%;
  }

  .flex3 {
    flex: 3 1 auto;
  }

  .specCard {
    width: 180%;
    height: 100%;
  }

  .radarChart {
    width: 100%;
    flex: 1 1 auto;
  }

	.chartBoxL, .chartBoxR {
		display: inline-block;
		margin: 0 2%;
	}

  .card-ul {
    margin-top: 20px;
  }

  .card-li {
    display: flex;
    justify-content: space-between;
    padding: 12px 0px;
    border-top: 2px solid #efefef;
    font-size: 14px;
    color: #666;
  }

  .danger {
    color: #f94652;
    opacity: .8;
  }

  .ordinary {
    color: #34c5d0;
  }

  .normal {
    color: lightgreen;
  }

  .lateBox {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .lateMan,
  .lateWon {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

  .lateManDesc,
  .lateWonDesc {
    font-size: 14px;
    padding: 8px;
  }
</style>

