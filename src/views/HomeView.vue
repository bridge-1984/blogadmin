<template>
<el-container>
  <el-aside width=auto>
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header><common-head></common-head></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHead from '../components/CommonHead.vue'
import '../assets/less/index.less'

export default {
  name: 'HomeView',
  components: {
    CommonAside,
    CommonHead
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
  .el-header{
    height: 50px;
    background-color: #eef1f6;
  }

  .el-aside{
    height: 100vh;
    position: sticky;
    top:0
  }

  .el-main{
    padding: 0
  }
</style>
