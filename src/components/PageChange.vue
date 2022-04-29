<template>
  <div>
<el-pagination
  background
  layout="prev, pager, next"
  :total="artNum"
  :page-size="size"
  @current-change="showpage">
</el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    showpage (val) {
      this.$emit('getpage', val)
    }
  },
  props: {
    artNum: {
      type: Number,
      default: 100
    },
    size: {
      type: Number,
      default: 6
    }
  }
}
</script>

<style lang='less' scoped>
div{
  margin: 20px 0;
  text-align: center
}

</style>
