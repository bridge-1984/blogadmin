<template>
  <div class="editContainer">
    <div class="editHead">
      <span @click="back" class="backButton">
        <i class="el-icon-arrow-left"></i>返回 |
      </span>
      <span class="editTitle"> 文章编辑</span>
    </div>
    <hr>
    <div class="editTable">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" style="width:20%" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag">
          <el-select v-model="form.tag" placeholder="请选择文章标签"  multiple>
            <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.name"
            :value="item.name + ',' + item.color"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章简介" prop="intro" style="width:60%; height:180px">
          <el-input type="textarea" v-model="form.intro" class="artContent"></el-input>
        </el-form-item>
        <el-form-item label="文章封面" prop="img">
          <el-upload
          action="http://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          >
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="作者" style="width:18%" prop="author">
          <el-input type="text" v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" style="width:80%" prop="content">
           <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit('form')">更新</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/*
1. 通过 id 分别获取文章信息和标签列表 --> ok
2. 根据 id 更新对应文章信息 --> ok
3. 更新 文章id 对应的标签列表 --> ok
  3.1 删除原有标签
  3.2 插入新的标签
*/

import { getAllTagAPI, getArtByIdAPI, getArtTaglistAPI, updateArticleAPI, delArticleTagAPI, addIntoTaglistAPI } from '@/api/articleApi.js'

export default {
  data () {
    return {
      form: {
        tag: []
      },
      tagList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        tag: [
          { required: true, type: 'array', message: '请至少选择一个标签', trigger: 'change' }
        ],
        img: [
          { message: '请上传文章封面', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请输入文章简介', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async getAllTag () {
      const { data: res } = await getAllTagAPI()
      this.tagList = res.data
    },
    async getArtById (id) {
      const { data: res } = await getArtByIdAPI(id)
      this.form = Object.assign(res.data[0], this.form)
    },
    async getArtTaglist (id) {
      const { data: res } = await getArtTaglistAPI(id)
      console.log(res)
      res.data.forEach(v => {
        this.form.tag.push(v.tagname + ',' + v.color)
      })
    },
    handleSubmit (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleUpdateBlog()
          this.handledelBlogTag(this.form.id)
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleUpdateBlog () {
      return updateArticleAPI(this.form)
        .then((res) => {
          console.log(res)
          this.$message.success('更新文章成功')
          this.$router.push('/article/list')
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('更新文章失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handledelBlogTag (val) {
      return delArticleTagAPI(val)
        .then((res) => {
          console.log(res)
          // this.$message.success('新增文章标签成功')
          // this.$router.push('/article/list')
          this.form.tag.forEach(v => {
            this.handleAddBlogTag({ id: this.form.id, tag: v })
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('删除文章标签失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleAddBlogTag (val) {
      return addIntoTaglistAPI(val)
        .then((res) => {
          console.log(res)
          // this.$message.success('新增文章标签成功')
          // this.$router.push('/article/list')
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('新增文章标签失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  created () {
    this.getAllTag()
    this.getArtById(this.$route.query.id)
    this.getArtTaglist(this.$route.query.id)
  }
}
</script>

<style lang='less' scoped>
  .editHead{
    font-size: 1.17em;
    margin: 10px;
    .editTitle{
      font-weight: bold;
    }
  }
  .editTable{
    margin: 20px;
  }
  .backButton:hover{
    cursor: pointer;
  }
  /deep/ .el-textarea__inner{
    min-height: 180px !important;
  }
</style>
