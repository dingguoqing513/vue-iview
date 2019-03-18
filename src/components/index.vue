<template>
  <div class="T-container">
    <Layout style="height: inherit;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <section class="compInfo">
          <img src="@/assets/cow.png" alt="logo" class="companyLogo">
        </section>
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
          <MenuItem name="opt.name" v-for="(opt, index) in menuConfig" :key="index" :name="opt.label">
            <Icon :type="opt.icon" size="20"></Icon>
            <span>{{ opt.label }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0, textAlign: 'left'}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </Header>
        <Content :style="{background: '#fff', minHeight: '260px'}">
          Content
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'BaseEnter',
  data () {
    return {
      isCollapsed: false,
      menuConfig: [{
        name: '1-1',
        label: '首页',
        icon: 'md-boat'
      }, {
        name: '1-2',
        label: '员工管理',
        icon: 'md-people'
      }, {
        name: '1-3',
        label: '出勤统计',
        icon: 'ios-stats'
      }, {
        name: '1-3',
        label: '工资报表',
        icon: 'md-list-box'
      }, {
        name: '1-3',
        label: '系统设置',
        icon: 'ios-settings'
      }]
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    selectMenu (label) {
      console.log(label)
    }
  }
}
</script>

<style scoped>
  .T-container {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    height: 100%;
    background: #f5f7f9;
  }

  .companyLogo {
    width: 100%;
    padding: 15px;
  }

  .layout-header-bar {
    position: relative;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,0.01);
    border-bottom: 1px solid #efefef;
    transform: border scale(.5);
  }

  .compInfo {
    color: #fff;
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon{
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
