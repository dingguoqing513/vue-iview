<template>
  <div>
	  <section class="chartSec">
	    <!-- chart ref="chart2" :options="options" :auto-resize="true" style="width: 45%;" class="chartBoxL"></chart> -->
	    <!-- <chart ref="chart3" :options="rightOptions" :auto-resize="true" style="width: 45%;" class="chartBoxR"></chart> -->
	  
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
            <chart ref="chart4" :options="radarOptions" style="width: 100%; height: 100%;" :auto-resize="true"></chart>
          </div>
        </section>
      </t-block>
    </section>

    <section class="chartSec">
      <t-block name='出勤次数-比例' class="lineBlock" span="1">
        <section style="with: 100%;height:100%;">
          <chart ref="chart2" :options="options" class="chart2" style="width: 100%;height: 250px;" :auto-resize="true"></chart>
        </section>
      </t-block>
      <t-block name='出勤次数-比例' span="6">
        <ul class="card-ul">
          <li class="card-li" v-for="(opt, index) in lateUser" :key="index">
            <div style="width: 35%;">{{ opt.name }}</div>
            <div style="width: 65%;">
              <Progress :percent="parseInt(opt.time/timeSum * 100)" :stroke-color="opt.time | userLevelColor" status="active"/>
            </div>
          </li>
        </ul>
      </t-block>
      <t-block name='男女人数-占比' span='1'>
        <section class="lateBox">
          <!-- 男 -->
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
export default {
  data() {
  	return {
  		options: {},
      rightOptions: {},
      radarOptions: {}, // 雷达图
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
    window.onresize = function() {
      that.$refs.chart4.resize()
      that.$refs.chart2.resize()
    }
  },
  components: {
    tBlock
  },
  methods: {
  	initChart() {
      this.options = {
        grid: {
          left: 40,
          right: 0
        },
        xAxis: {
        type: 'category',
        data: ['06.11', '06.12', '06.13', '06.14', '06.15', '06.16', '06.17'],
        boundaryGap: ['10%', '10%',], //坐标轴两边留白
        axisLine: { //坐标轴
          lineStyle:{
            opacity: 0.01 //设置透明度就可以控制显示不显示
          }
        },
        splitLine: { //网格线
          show: false, //网格线
          lineStyle:{
            color: '#eee'	
          }
        },
        axisTick: { //刻度线
          show: false, //去掉刻度线
        }
	    },
	    yAxis: {
        min:0, //最小刻度
        max:30, //最大刻度
        type: 'value',
        name:'本周情况', //是基于Y轴线对齐，用空格站位让坐标轴名称与刻度名称对齐
        nameTextStyle: {
          color:'#444e65',
          fontSize: '16',
          align:'left', //文字水平对齐方式
          verticalAlign:'middle' //文字垂直对齐方式
        },
        axisTick: { //刻度线
          show: false //去掉刻度线
        },
        axisLine: { //坐标轴线
          lineStyle:{
            opacity: 0 //透明度为0 
          }
        },
        splitLine: {//网格线
          // show: false,//网格线
          lineStyle: {
            color: '#eee'
          }
        }
	    },
	    series: [{
        data: [5, 13, 10, 18, 14, 16, 14,], //数据
        type: 'line', //图表类型，折线图还是柱状图还是饼图
        label: { //图形上的文本标签
          normal:{
            formatter: '{@data}次',
            show: true, //显示数据
            color: '#00af58',
            position: 'top',
            fontSize:'14'
          }
        },
        itemStyle: {//折线拐点标志的样式。
          normal: {
            color: '#00af58'
          }
        },
        areaStyle: {//区域填充样式
          normal:{
            color: {
              type:'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0, 175, 88, 0.4)',
              },{
                offset: 1,
                color: 'rgba(0, 175, 88, 0.01)',
              }],
              globaCoord: false,
            }
          }
        }
	    }]
      }

      this.radarOptions = {
        title: {
          text: '雷达示意图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // orient: 'vertical', // 标记方向
          // icon: 'triangle',
          botton: 5,
          itemWidth: 20,
          itemGap: 10,
          top: 0,
          textStyle: {
            color: '#000',
            fontSize: 14
          },
          data:[{ name: '客服部'},
                { name: '行政部'},
                { name: '后端组'},
                { name: '前端组'}]
        },
        radar: {
            indicator: [
                {text: '客服部', max: 100},
                {text: '行政部', max: 100},
                {text: '后端组', max: 100},
                {text: '前端组', max: 100}
            ],
            radius: 60,
            center: ['55%','57%'],
          },
        series: [
          {
            type: 'radar',
            tooltip: {
              position: ['50%', '50%'],
              trigger: 'item'
            },
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [
              {
                value: [60,73,85,40,99],
                name: '客服部'
              },
              {
                value: [70,23,89,19,56],
                name: '行政部'
              },
              {
                value: [20,83,19,29,76],
                name: '后端组'
              },
              {
                value: [45,82,27,20,91],
                name: '前端组'
              }
            ]
          }
        ]
      }

      let pieData = mock.cardData[0].detailList.map(opt => {
      	return { name: opt.name, value: opt.num }
      })
      this.rightOptions = {
		    title: {
		        text: '饼状渲染图',
		        left: 'center',
		        top: 20,
		        textStyle: {
		            color: 'red'
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    visualMap: {
		        show: false,
		        min: 1,
		        max: 30,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series: [{
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:pieData.sort(function (a, b) {
            return a.value - b.value 
          }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: '' // 名称颜色
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
              }
	          }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(0, 0, 0, .4)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#6881af',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffsetY: '5'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
      }]
      }
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
    height: inherit;
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

