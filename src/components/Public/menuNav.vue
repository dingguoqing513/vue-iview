<template>
  <div>
    <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
      <MenuItem v-for="(opt, index) in menuConfig" :key="index" :name="opt.path">
        <Icon :type="opt.icon" size="20"></Icon>
        <span>{{ opt.label }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'menuNav',
  data () {
    return {
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
      }]
    }
  },
  computed: {
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    selectMenu (label) {
      console.log(label)
      this.$router.push(label)
    }
  }
}
</script>

