<template>
<el-menu class="el-menu-vertical-demo"
:collapse="isCollapse"
background-color="#545c64"
text-color="#fff"
active-text-color="#ffd04b"
unique-opened
router
default-active="/home">
  <h3>{{isCollapse? '后台': 'Brid 后台管理'}}</h3>
  <el-menu-item v-for="item in noChild" :key="item.name" :index="item.path" @click="handleBread(item)">
      <i :class="'el-icon'+item.icon"></i>
      <span slot="title">{{item.lable}}</span>
  </el-menu-item>
  <el-submenu v-for="item in hasChild" :key="item.name" :index="item.path">
    <template slot="title">
      <i :class="'el-icon'+item.icon"></i>
      <span slot="title">{{item.lable}}</span>
    </template>
      <el-menu-item v-for="it in item.child" :key="it.name" :index="it.path" @click="handleBread(it)">{{it.lable}}</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  name: 'CommonAside',
  data () {
    return {
      menu: [
        {
          name: 'Home',
          path: '/home',
          icon: '-s-home',
          lable: '主页',
          child: null
        },
        {
          name: 'Article',
          path: '/article',
          icon: '-s-management',
          lable: '文章管理',
          child: [
            {
              name: 'ArticleList',
              path: '/article/list',
              lable: '文章列表'
            },
            {
              name: 'ArticleAdd',
              path: '/article/add',
              lable: '添加文章'
            }
          ]
        },
        {
          name: 'Tag',
          path: '/tag',
          icon: '-s-flag',
          lable: '标签管理',
          child: [
            {
              name: 'TagList',
              path: '/tag/list',
              lable: '标签列表'
            },
            {
              name: 'TagAdd',
              path: '/tag/add',
              lable: '添加标签'
            }
          ]
        }
      ]
    }
  },
  computed: {
    noChild () {
      return this.menu.filter(item => item.child === null)
    },
    hasChild () {
      return this.menu.filter(item => item.child !== null)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  },
  methods: {
    handleBread (item) {
      this.$store.commit('clickMenu', item)
    }
  }
}
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
width: 200px;
  }
.el-menu{
  height: 100vh;
  border: 0;

    h3{
      height: 45px;
      line-height: 45px;
      align-content: center;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }
}
</style>
