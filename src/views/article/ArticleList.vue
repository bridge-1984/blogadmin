<template>
  <div class="artContainer">
    <h3>文章列表</h3>
    <hr>
    <div class="artList">
      <el-table
    :data="currList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      class="id">
    </el-table-column>
    <el-table-column
      fixed
      prop="title"
      label="标题"
      width="150"
      class="title">
    </el-table-column>
    <!-- <el-table-column
      label="类型"
      width="120"
      >
      <template slot-scope="scope">
        <el-tag v-for="item in scope.row.tag" :key="item.id" :color="item.color" effect="dark">{{item.tagname}}</el-tag>
      </template>
    </el-table-column> -->
    <el-table-column
      prop="intro"
      label="描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="img"
      label="封面"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="120">
    </el-table-column>
    <el-table-column
      prop="watch_num"
      label="观看数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dianzan"
      label="点赞数"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="medium">编辑</el-button>
        <el-button @click="delArticle(scope.row.id, scope.$index)" type="text" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <page-change :artNum="artNum" :size="size" @getpage="getcurrPage" ></page-change>
  </div>
</template>

<script>
import PageChange from '@/components/PageChange.vue'
import { getArticleListAPI, delArtByIdAPI, delArticleTagAPI } from '@/api/articleApi.js'

export default {
  components: {
    PageChange
  },
  data () {
    return {
      artListData: [],
      artNum: 0,
      currList: [],
      size: 6,
      page: 0,
      taglist: []
    }
  },
  methods: {
    async getArtList () {
      const { data: res } = await getArticleListAPI()
      this.artListData = res.data
      this.artNum = this.artListData.length
      // this.artListData.forEach((v, i) => {
      //   this.getArtTag(v.id, i)
      // })
      // console.log(this.taglist)

      // this.artListData.forEach((v, i) => {
      //   v.tag = this.taglist[i]
      // })
      this.currList = this.artListData.slice(this.star, this.end)
      // console.log(this.artListData)
    },
    // async getArtTag (id, i) {
    //   const { data: res } = await getArtTaglistAPI(id)
    //   this.taglist[i] = res.data
    //   return res.data
    // },

    getcurrPage (val) {
      this.page = val - 1
      console.log(this.page)
      this.currList = this.artListData.slice(this.star, this.end)
    },
    delArticle (id, key) {
      delArtByIdAPI(id)
      delArticleTagAPI(id)
      this.artListData.splice(key, 1)
      this.artNum = this.artListData.length
      this.currList = this.artListData.slice(this.star, this.end)
    },
    handleClick (key) {
      this.$router.push({ path: 'edit', query: { id: key } })
      console.log(key)
    }
  },

  created () {
    this.getArtList()
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

<style lang='less' scoped>
  h3{
    padding: 10px;
  }

  .artList{
    margin: 20px;
  }

  /deep/ .el-table .cell{
    white-space: nowrap;
  }

</style>
