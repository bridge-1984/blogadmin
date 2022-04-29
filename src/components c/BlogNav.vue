<template>
  <div class="blogNav-container">
    <div class="content">
    <!-- 顶部导航条 -->
    <div class="logo"><img src="@/assets/logo.png" alt=""></div>
<el-menu
  :default-active="this.$route.path"
  class="el-menu-demo"
  mode="horizontal"
  background-color="#fff"
  active-text-color="#409EFF"
  :router=true
  >
  <el-menu-item index="/index">首页</el-menu-item>
  <el-menu-item index="/list/all">文章列表</el-menu-item>
  <el-menu-item index="/list/1" disabled>留言</el-menu-item>
  <el-menu-item @click="login">后台登陆</el-menu-item>
</el-menu>
</div>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      location.href = 'http://127.0.0.1:8099/'
    }
  }
}
</script>

<style lang='less' scoped>
  .blogNav-container{
    height: 60px;
    background-color: #fff;
    text-align: center;
    .content{
      width: 80%;
      margin: 0 auto
    }
  }
  .el-menu{
    float: right;
  }
  .logo img{
    float: left;
    width: 90px;
    height: 60px;
  }
</style>
