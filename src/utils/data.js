
export default {
  // 菜单
  menuConfig: [{
    name: '1-1',
    label: '首页',
    icon: 'md-boat',
    path: '/'
  }, {
    name: '1-2',
    label: '员工管理',
    icon: 'md-people',
    path: '/user'
  }, {
    name: '1-3',
    label: '出勤统计',
    icon: 'ios-stats',
    path: '/attend'
  }, {
    name: '1-3',
    label: '工资报表',
    icon: 'md-list-box',
    path: '/payroll'
  }, {
    name: '1-3',
    label: '系统设置',
    icon: 'ios-settings',
    path: '/setting'
  }],
  // mock员工
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
    }]
  }