<template>
  <div>
    <headers title="本月考勤数据统计"></headers>
    <section class="cardContainer">
      <Card class="cardBox"
            v-for="(opt, index) in cardData"
            :bordered="false"
            :key="index"
            :style="{ 
              background: opt.bgColor,
              boxShadow: `3px 3px 20px ${opt.bgColor}`
            }">
        <div>
          <div>{{ opt.title }}人数</div>
          <div class="infoBot">
            <div class="infoBotL">{{ opt.count }}次</div>
            <Poptip placement="right" width="230" class="poptipContainer">
              <div class="infoBotR" >{{ opt.title }}的员工</div>
              <div slot="content" class="color_3 slotContent">
                <ul>
                  <li v-for="(item, key) in opt.detailList" :key="key" class="detailList">
                    <div>
                      <img class="detailImg" :src="item.sex === 0 ? manImg : womanImg">
                      <span>{{ item.name }}</span>
                      <span class="detailNum">{{ item.num }}</span>次
                    </div>
                  </li>
                </ul>
              </div>
            </Poptip>
          </div>
        </div>
      </Card>
    </section>

    <section class="charts_box">
      <highcharts-component id='container' :options="options" :styles="styles"></highcharts-component>
      <highcharts-component id='container2' :options="options2" :styles="styles2"></highcharts-component>
    </section>
  </div>
</template>

<script>
import headers from '@/components/Public/headers.vue'
import { debounce } from '@/utils/utils'
import mock from '../utils/data.js'
import highchartsComponent from '@/components/Public/highcharts.vue'
import Highcharts from 'highcharts/highstock';
export default {
  data () {
    return {
      cardData: mock.cardData,
      manImg: require('@/assets/man.png'),
      womanImg: require('@/assets/woman.png'),
      options: {},
      options2: {},
      styles: {
        margin: '20px 0',
        width: '45%'
      },
      styles2: {
        margin: '20px 0',
        width: '50%'
      },
      lastMonthSaves: [130.98, 220.5, 90.48, 341.66],
      nestMonthSaves: [198.88, 140.541, 210.78, 223.879]
    }
  },
  mounted () {
    var that = this
    this.options = {
        chart: {
          type: 'column',
          styledMode: false
        },
        title: {
          // text: '上月/本月部门盈利情况',
          text: '.',
          style: 'highcharts-title'
        },
        xAxis: [{
          categories: ['1号~7号', '8号~14号', '15号~21号', '22号~月末'],
        }],
        yAxis: {
            min: 0,
            title: {
                text: '(单位：万元)'
            },
            stackLabels: { // 堆叠数据标签
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        plotOptions: {
          column: {
            borderRadius: 5
          }
        },
        series: [{
            name: '销售一部',
            data: [130.98, 220.5, 90.48, 341.66]
        }, {
            name: '销售二部',
            data: [198.88, 140.541, 210.78, 223.879]
        }, {
            name: '销售三部',
            data: [130.98, 220.5, 90.48, 341.66]
        }, {
            name: '销售四部',
            data: [198.88, 140.541, 210.78, 223.879]
        }],
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return this.series.name + ': ' + this.y + '<br/>' +
                    '本次占比: ' + ((this.y / this.point.stackTotal) * 100).toFixed(2)  + '%';
            }
        },
        credits: {
          enabled: true,
          text: '本月销售部门的营销总和汇集表'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        // 如果不需要数据标签阴影，可以将 textOutline 设置为 'none'
                        textOutline: '1px 0.5px #768232'
                    },
                    formatter: function () {
                        return this.y.toFixed(2);
                    }
                }
            }
        }
    }

    this.options2 = {
      chart: {
        type: 'column',
        styledMode: false
      },
      title: {
        text: '上月/本月部门盈利情况',
        style: 'highcharts-title2'
      },
      xAxis: [{
        categories: ['1号~7号', '8号~14号', '15号~21号', '22号~月末'],
      }],
      yAxis: [{
        categories: [],
        className: 'highcharts-color-0',
        title: {
          text: '(单位：万元)'
        },
        labels: {
          format: '{value}'
        }
      }, {
        className: 'highcharts-color-1',
        opposite: true,
        title: {
          text: '（本月的第一个周一开始计算）'
        }
      }],
      series: [{
        data: that.lastMonthSaves,
        name: '上月',
        labels: {
          format: '{value}万元'
        }
      }, {
        data: that.nestMonthSaves,
        name: '本月'
      }]
    }

    // 图表初始化函数
    var chart = Highcharts.chart('container', this.options);
    var chart2 = Highcharts.chart('container2', this.options2);
    // chart2.series[0].setData(this.lastMonthSaves)
  },
  methods: {
  },
  components: {
    headers,
    highchartsComponent
  }
}
</script>

<style>
  .cardContainer {
    display: flex;
    justify-content: space-between;
  }

  .poptipContainer .ivu-poptip-body-content {
    overflow: hidden;
  }
  
  .cardBox {
    width: 18%;
    height: 120px;
    border-radius: 6px;
    flex: 0 0 auto;
    color: #fff;
    position: relative;
  }

  .infoBot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 35px;
  }

  .infoBotL {
    font-size: 26px;
  }

  .infoBotR {
    cursor: pointer;
  }

  .detailImg {
    padding-right: 10px;
    width: 35px;
    vertical-align: middle;
  }

  .detailList {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }

  .detailNum {
    color: #2561EF;
    font-size: 18px;
    padding-left: 20px;
  }

  .chartBox > div, .chartBox canvas {
    width: 100% !important;
  }

  .charts_box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  /* Link the series colors to axis colors */
  .highcharts-root {
    fill: #fff;
  }
  .highcharts-title {
    fill: #47abff;
    font-size: medium;
    font-family: "圆体-简", "平方-简", "娃娃体-简";
    transform: translateY(0px);
  }
  .highcharts-title2 {
    transform: translateY(40px);
  }
  .highcharts-color-0 {
    fill: rgb(120, 171, 217);
    stroke: #7cb5ec;
  }
  .highcharts-axis.highcharts-color-0 .highcharts-axis-line {
    stroke: #7cb5ec;
  }
  .highcharts-axis.highcharts-color-0 text {
    fill: #7cb5ec;
  }
  .highcharts-color-1 {
    fill: #e4c0ff;
    stroke: #e4c0ff;
  }
  .highcharts-axis.highcharts-color-1 .highcharts-axis-line {
    stroke: #90ed7d;
  }
  .highcharts-axis.highcharts-color-1 text {
    fill: #90ed7d;
  }
  .highcharts-yaxis .highcharts-axis-line {
    stroke-width: 2px;
  }
</style>


