<template>
  <div>
    <Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
      <MenuItem v-for="(opt, index) in menuConfig" :key="index" :name="opt.path">
        <Icon :type="opt.icon" size="20"></Icon>
        <span>{{ opt.label }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import utilData from '@/utils/data'
export default {
  name: 'menuNav',
  props: ['isCollapsed'],
  data () {
    return {
      menuConfig: [],
      activeName: ''
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
  created () {
    this.menuConfig = utilData.menuConfig
    this.activeName = this.$route.path
  },
  methods: {
    selectMenu (label) {
      console.log(label)
      this.$router.push(label)
    }
  }
}
</script>

<style>
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

  .menu-icon {
    transition: all .3s;
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
