<template>
  <div class="editContainer">
    <div class="editHead">
      <span @click="back" class="backButton">
        <i class="el-icon-arrow-left"></i>返回 |
      </span>
      <span class="editTitle"> 添加文章</span>
    </div>
    <hr>
    <div class="editTable">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" style="width:20%" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag">
          <el-select v-model="form.tag" placeholder="请选择文章标签" multiple>
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
          <el-button type="primary"  @click="handleSubmit('form')" :loading="loading">添加</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAllTagAPI, addArticleAPI, addIntoTaglistAPI, getLastIdAPI } from '@/api/articleApi.js'

export default {
  data () {
    return {
      form: {
        id: 0,
        title: '',
        tag: [],
        intro: '',
        content: '',
        img: '',
        author: '',
        date: new Date().toLocaleDateString()
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
    async getLastId () {
      const { data: res } = await getLastIdAPI()
      this.form.id = res.data[0].id + 1
    },
    handleSubmit (formName) {
      this.loading = true
      // if (!this.info.markdown) {
      //   this.$message.warning('请填写文章内容')
      //   this.loading = false
      //   return
      // }
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //  this.info.html = this.info.markdown
          this.handleAddBlog()
          // addIntoTaglistAPI(this.form)
          this.form.tag.forEach(v => {
            this.handleAddBlogTag({ id: this.form.id, tag: v })
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleAddBlog () {
      return addArticleAPI(this.form)
        .then((res) => {
          console.log(res)
          this.$message.success('新增文章成功')
          this.$router.push('/article/list')
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('新增文章失败')
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
          this.$message.info('新增文章失败')
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
    this.getLastId()
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
