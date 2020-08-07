
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
  }],
  educations: [{
    label: '博士',
    value: 'doctor'
  }, {
    label: '硕士',
    value: 'masterDegree'
  }, {
    label: '本科',
    value: 'undergraduate'
  }, {
    label: '大专',
    value: 'junior'
  }, {
    label: '中专',
    value: 'secondary'
  }, {
    label: '高中',
    value: 'highSchool'
  }, {
    label: '初中',
    value: 'juniorSchool'
  }, {
    label: '小学',
    value: 'primarySchool'
  }, {
    label: '文盲',
    value: 'illiteracy'
  }],
  testUserList: [{
    name: '测试姓名',
    id: 201903220001,
    department: '测试部',
    phone: 18888888888,
    email: 'test@test.com',
    education: '本科'
  }],
  bubbleSeries: [{
      name: '客服部',
      data: [{
          name: '李刚',
          value: 100
      },
      {
          name: "刘美",
          value: 50
      },
      {
          name: "丽萨",
          value: 76
      },
      {
          name: "崔大",
          value: 72
      }]
  }, {
      name: '行政部',
      data: [{
          name: "小妹",
          value: 82
      },
      {
          name: "小美",
          value: 93
      },
      {
          name: "小可",
          value: 392
      }, {
          name: "小笑",
          value: 225
      }, {
          name: "小啦",
          value: 141
      }]
  }, {
      name: '后端部',
      data: [{
          name: "阿萨",
          value: 409
      },
      {
          name: "災哩",
          value: 34
      },
      {
          name: "噶皮",
          value: 711
      }, {
          name: "周都",
          value: 34
      },
      {
          name: "丁帅",
          value: 321
      }, {
          name: "王动",
          value: 340
      },
      {
          name: "赵优秀",
          value: 171
      }, {
          name: "郑丹丹",
          value: 234
      },
      {
          name: "冯公",
          value: 871
      }]
  }, {
      name: '前端部',
      data: [{
          name: "周喏",
          value: 76
      },
      {
          name: "政国",
          value: 5335
      }, {
          name: "凯豆",
          value: 566
      }, {
          name: "马卡",
          value: 456
      }]
  }, {
      name: '销售部',
      data: [{
          name: "一多",
          value: 720
      },
      {
          name: "大力",
          value: 81
      },
      {
          name: "百特",
          value: 178
      },
      {
          name: "贝多芬",
          value: 349
      }, 
      {
          name: "艾瑞卡",
          value: 1210
      },
      {
          name: "薇薇",
          value: 195
      }]
  }, {
      name: '采购部',
      data: [{
          name: "欧迪",
          value: 659
      },
      {
          name: "之美",
          value: 801
      },
      {
          name: "德芙",
          value: 1021
      },
      {
          name: "魏五",
          value: 790
      },
      {
          name: "阿卡拉",
          value: 1011
      },
      {
          name: "瑞里",
          value: 1766
      },
      {
          name: "Kies",
          value: 618
      },
      {
          name: "Kore",
          value: 610
      }]
  }]
}