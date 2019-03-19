<template>
  <div class="T-container">
    <Layout style="height: inherit;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <section class="compInfo">
          <img :src="logoImg" alt="logo" class="companyLogo">
        </section>
        <menu-nav></menu-nav>
      </Sider>
      <Layout>
        <Header :style="{padding: 0, textAlign: 'left'}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px',}" type="md-menu" size="24"></Icon>
          <div class="userInfo">
            <img :src="userImg" alt="header" class="userHeader">
            <span :style="{color: 'skyBlue', cursor: 'pointer'}">{{ userName }}</span>
          </div>
        </Header>
        <Content :style="{background: '#fff', minHeight: '260px', textAlign: 'left', padding: '20px'}">
          <keep-alive>
             <router-view></router-view>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import menuNav from '@/components/Public/menuNav'
export default {
  name: 'BaseEnter',
  data () {
    return {
      isCollapsed: false,
      logoImg: require('@/assets/cow.png'),
      userImg: require('@/assets/user.png'),
      userName: '管理员'
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    }
  },
  components: {
    menuNav
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

  .userHeader {
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }

  .userInfo {
    position: absolute;
    right: 30px;
    top: 0;
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
