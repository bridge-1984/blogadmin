<template>
  <div class="tagContainer">
    <h3>标签列表</h3>
    <hr>
    <div class="tagList">
      <el-table
    :data="currList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"

      >
    </el-table-column>
    <el-table-column
      fixed
      prop="name"
      label="标签"
      >
    </el-table-column>
    <el-table-column
      fixed
      prop="color"
      label="背景色"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="medium">编辑</el-button>
        <el-button @click="delTag(scope.row.id, scope.$index)" type="text" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <page-change :artNum="artNum" :size="size" @getpage="getcurrPage" ></page-change>
  </div>
</template>

<script>
import PageChange from '@/components/PageChange.vue'
import { getAllTagAPI, delTagAPI } from '@/api/articleApi.js'

export default {
  components: {
    PageChange
  },
  data () {
    return {
      taglist: [],
      artNum: 0,
      currList: [],
      size: 6,
      page: 0
    }
  },
  methods: {
    async initTaglist () {
      const { data: res } = await getAllTagAPI()
      this.taglist = res.data
      this.artNum = this.taglist.length
      this.currList = this.taglist.slice(this.star, this.end)
    },
    getcurrPage (val) {
      this.page = val - 1
      console.log(this.page)
      this.currList = this.taglist.slice(this.star, this.end)
    },
    delTag (id, key) {
      delTagAPI(id)
      this.taglist.splice(key, 1)
      this.artNum = this.taglist.length
      this.currList = this.taglist.slice(this.star, this.end)
    },
    handleClick (key) {
      this.$router.push({ path: 'edit', query: { id: key } })
      console.log(key)
    }

  },
  created () {
    this.initTaglist()
    console.log(1)
  },
  computed: {
    star () {
      return this.page * this.size
    },
    end () {
      return this.page * this.size + this.size
    }
  }
}
</script>

<style lang='less'>
h3{
    padding: 10px;
  }
.tagList{
  margin: 20px;
}
</style>
