<template>
  <div>
    <headers title="考勤数据统计"></headers>
    <p class="lastMonth"><b>上月考勤情况</b></p>
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
              <div class="infoBotR" >查看{{ opt.title }}的小伙伴</div>
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

    <section>
      <chart ref="chart1" :options="orgOptions" :auto-resize="true" style="width: 100%;" class="chartBox"></chart>
    </section>
  </div>
</template>

<script>
import headers from '@/components/Public/headers.vue'
import { debounce } from '@/utils/utils'
export default {
  data () {
    return {
      cardData: [{
        bgColor: 'rgba(134, 147, 243, 1)',
        title: '迟到',
        count: 23,
        detailList: [{
          name: '技术部-李明',
          id: 'js2018100013',
          sex: 1, // 0男 1女
          num: 8
        }, {
          name: '销售部-张刚',
          id: 'xs2018100032',
          sex: 0,
          num: 7
        }, {
          name: '测试部-李美丽',
          id: 'cs2018100019',
          sex: 1,
          num: 4
        }, {
          name: '产品部-王建军',
          id: 'cp2018100003',
          sex: 0,
          num: 2
        }, {
          name: '设计部-刘小凯',
          id: 'sj2018100018',
          sex: 0,
          num: 1
        }, {
          name: '人事部-孙丹丹',
          id: 'rs2018100045',
          sex: 1,
          num: 1
        }]
      }, {
        bgColor: 'rgba(255, 153, 153, 1)',
        title: '早退',
        count: 18,
        detailList: [{
          name: '技术部-李明',
          id: 'js2018100013',
          sex: 1, // 0男 1女
          num: 5
        }, {
          name: '销售部-张刚',
          id: 'xs2018100032',
          sex: 0,
          num: 5
        }, {
          name: '测试部-李丽',
          id: 'cs2018100019',
          sex: 1,
          num: 4
        }, {
          name: '产品部-王军',
          id: 'cp2018100003',
          sex: 0,
          num: 2
        }, {
          name: '设计部-刘凯',
          id: 'sj2018100018',
          sex: 0,
          num: 1
        }, {
          name: '人事部-孙丹',
          id: 'rs2018100045',
          sex: 1,
          num: 1
        }]
      }, {
        bgColor: 'rgba(120, 171, 217, 1)',
        title: '旷工',
        count: 18,
        detailList: [{
          name: '技术部-李明',
          id: 'js2018100013',
          sex: 1, // 0男 1女
          num: 5
        }, {
          name: '销售部-张刚',
          id: 'xs2018100032',
          sex: 0,
          num: 5
        }, {
          name: '测试部-李丽',
          id: 'cs2018100019',
          sex: 1,
          num: 4
        }, {
          name: '产品部-王军',
          id: 'cp2018100003',
          sex: 0,
          num: 2
        }, {
          name: '设计部-刘凯',
          id: 'sj2018100018',
          sex: 0,
          num: 1
        }, {
          name: '人事部-孙丹',
          id: 'rs2018100045',
          sex: 1,
          num: 1
        }]
      }, {
        bgColor: 'rgba(164, 123, 208, 1)',
        title: '未写日报',
        count: 18,
        detailList: [{
          name: '技术部-李明',
          id: 'js2018100013',
          sex: 1, // 0男 1女
          num: 5
        }, {
          name: '销售部-张刚',
          id: 'xs2018100032',
          sex: 0,
          num: 5
        }, {
          name: '测试部-李丽',
          id: 'cs2018100019',
          sex: 1,
          num: 4
        }, {
          name: '产品部-王军',
          id: 'cp2018100003',
          sex: 0,
          num: 2
        }, {
          name: '设计部-刘凯',
          id: 'sj2018100018',
          sex: 0,
          num: 1
        }, {
          name: '人事部-孙丹',
          id: 'rs2018100045',
          sex: 1,
          num: 1
        }]
      }, {
        bgColor: 'rgba(0, 204, 153, 1)',
        title: '未打卡',
        count: 18,
        detailList: [{
          name: '技术部-李明',
          id: 'js2018100013',
          sex: 1, // 0男 1女
          num: 5
        }, {
          name: '销售部-张小刚',
          id: 'xs2018100032',
          sex: 0,
          num: 5
        }, {
          name: '测试部-李小丽',
          id: 'cs2018100019',
          sex: 1,
          num: 4
        }, {
          name: '产品部-王小军',
          id: 'cp2018100003',
          sex: 0,
          num: 2
        }, {
          name: '设计部-刘小凯',
          id: 'sj2018100018',
          sex: 0,
          num: 1
        }, {
          name: '人事部-孙小丹',
          id: 'rs2018100045',
          sex: 1,
          num: 1
        }]
      }],
      manImg: require('@/assets/man.png'),
      womanImg: require('@/assets/woman.png'),
      orgOptions: {}
    }
  },
  mounted() {
    this.initChart()


    //   xAxis: {
    //     type: 'category',
    //     data: ['01.23', '01.24', '01.25', '01.26', '01.27', '01.28', '01.29'],
    //     boundaryGap: ['10%', '10%',],//坐标轴两边留白
    //     axisLine: {//坐标轴
    //         lineStyle:{
    //             opacity: 0.01,//设置透明度就可以控制显示不显示
    //         },
    //     },
    //     splitLine: {//网格线
    //         show: false,//网格线
    //         lineStyle:{
    //             color: '#eee',
    //         },
    //     },
    //     axisTick: {//刻度线
    //         show: false,//去掉刻度线
    //     }
    // },
    // yAxis: {
    //     min:0,//最小刻度
    //     max:25,//最大刻度
    //     type: 'value',
    //     name:'℃         ',//是基于Y轴线对齐，用空格站位让坐标轴名称与刻度名称对齐
    //     nameTextStyle: {
    //         color:'#444e65',
    //         align:'left',//文字水平对齐方式
    //         verticalAlign:'middle' //文字垂直对齐方式
    //     },
    //     axisTick: { //刻度线
    //         show: false //去掉刻度线
    //     },
    //     axisLine: { //坐标轴线
    //         lineStyle:{
    //             opacity: 0 //透明度为0 
    //         }
    //     },
    //     splitLine: {//网格线
    //         // show: false,//网格线
    //         lineStyle:{
    //             color: '#eeeeee'
    //         }
    //     }
    // },
    // series: [{
    //       data: [15, 14, 10, 11, 14.58, 10, 11.5,],//数据
    //       type: 'line',//图表类型，折线图还是柱状图还是饼图
    //       label: {//图形上的文本标签
    //           normal:{
    //               formatter: '{@data}℃',
    //               show: true,//显示数据
    //               color: '#00af58',
    //               position: 'top',
    //               fontSize:'14',
    //           },
    //       },
    //       itemStyle: {//折线拐点标志的样式。
    //           normal: {
    //               color: '#00af58',
    //           },
    //       },
    //       areaStyle: {//区域填充样式
    //           normal:{
    //               color: {
    //                   type:'linear',
    //                   x: 0,
    //                   y: 0,
    //                   x2: 0,
    //                   y2: 1,
    //                   colorStops: [
    //                       {
    //                           offset: 0,
    //                           color: 'rgba(0, 175, 88, 0.4)',
    //                       },
    //                       {
    //                           offset: 1,
    //                           color: 'rgba(0, 175, 88, 0.01)',
    //                       },
    //                   ],
    //                   globaCoord: false,
    //               }
    //           }
    //       }
    //   }]
    // }
  },
  methods: {
    initChart() {
      this.orgOptions = {
        grid: {
          left: 40,
          right: 0
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          name: '(单位：次)',
          nameTextStyle: {
            fontWeight: 'bold'
          },
          type: 'value'
        },
        series: [{
          data: ['29', '23', '26', '21', '14', '12', '31', '23', '7', '27', '15', '18'],
          type: 'line',
          itemStyle: {
            normal: {
              label: {
                show: true,
                // formatter: "{c}次",
                textStyle: {
                  color: 'darkBlue' // 数值点颜色
                }
              }
            }
          },
          smooth: false // 曲线是否平滑显示
        }]
      }
    }
  },
  components: {
    headers
  }
}
</script>

<style>
  .lastMonth {
    padding-bottom: 15px;
  }

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
</style>


