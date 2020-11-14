<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          nav 1
        </a-menu-item>
        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template v-for="item in menuList">
            <a-menu-item :key="item.id" v-if="!item.children" @click="changeRouter(item)">
              {{item.title}}
            </a-menu-item>
            <a-sub-menu :key="item.id" v-else>
              <span slot="title"><a-icon type="laptop" />{{item.title}}</span>
              <a-menu-item :key="ite.id" v-for="ite in item.children" @click="changeRouter(ite)">
                {{ite.title}}
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      menuList: []
    };
  },
  created() {
    this.$router.push('/')
    this.init()
  },
  watch: {
    '$store.state.menu.menuList': {
      handler () {
        this.menuList = this.$store.state.menu.menuList
        console.log(this.menuList)
      },
      deep: true
    }
  },  
  methods: {
    init () {
      this.$store.dispatch('menu/getMenuList')
    },
    changeRouter (item) {
      this.$router.push(item.link)
    }
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>