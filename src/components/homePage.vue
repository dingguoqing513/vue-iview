<template>
  <div>
    <h1 class="homeTitle">考勤数据统计</h1>
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
                      <img class="detailImg" :src="item.sex === 0 ? 'manImg' : 'womanImg'">
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
      <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    </section>
  </div>
</template>

<script>
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
    this.orgOptions = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    }
  },
  methods: {
  }
}
</script>

<style>
  .homeTitle {
    font-weight: 300;
    font-size: 24px;
    padding: 20px 0;
  }

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
</style>


