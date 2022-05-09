<template>
  <div class="headContainer">
    <div class="left">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <div class="Bread">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{item.lable}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/logo.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="backtoblog">用户名</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    handleMenu () {
      this.$store.commit('collapseMenu')
    },
    logout () {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    },
    backtoblog () {
      window.location.href = 'http://localhost:8080/'
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.menuList
    })
  }
}
</script>

<style lang='less' scoped>
  .headContainer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .el-dropdown-link{
    display: inline-block;
    width: 40px;
    height: 40px;

    img{
      margin: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .el-button{
    margin-right: 20px;
  }
  .left{
    display: flex;
    align-items: center;
  }
  .Bread{
    display: inline-block;
    .el-breadcrumb{
      font-size: 14px;
    }
  }

</style>
