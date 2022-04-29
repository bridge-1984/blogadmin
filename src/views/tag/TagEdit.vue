<template>
  <div>
    <div class="editHead">
      <span @click="back" class="backButton">
        <i class="el-icon-arrow-left"></i>返回 |
      </span>
      <span class="editTitle"> 更新标签</span>
    </div>
    <hr>
   <div class="editTable">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标签名字" prop="name">
          <el-input v-model="form.name" style="width:20%" placeholder="请输入标签名字"></el-input>
        </el-form-item>
        <el-form-item label="背景色" style="width:20%" prop="color">
          <el-input type="text" v-model="form.color" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <sketch-picker
            v-model="form.color"
            @input="colorValueChange"
          ></sketch-picker>
        </el-form-item>
        <el-form-item label="预览" v-if="form.name">
          <el-tag :color="form.color" effect="dark" style="border: none">{{form.name}}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="handleSubmit('form')" :loading="loading">添加</el-button>
        </el-form-item>
      </el-form>
   </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import { updateTagAPI, getTagByIdAPI } from '@/api/articleApi.js'

export default {
  components: {
    'sketch-picker': Sketch
  },
  data () {
    return {
      form: {
        name: '',
        color: ''
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请填写背景色', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async initTag (id) {
      const { data: res } = await getTagByIdAPI(id)
      this.form = res.data[0]
    },
    colorValueChange (fmtObj) {
      // 取颜色对象的 rgba 值
      const { r, g, b, a } = fmtObj.rgba
      this.form.color = `rgba(${r}, ${g}, ${b}, ${a})`
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
          this.handleUpdateTag()
          // addIntoTaglistAPI(this.form)
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleUpdateTag () {
      return updateTagAPI(this.form)
        .then((res) => {
          console.log(res)
          this.$message.success('更新标签成功')
          this.$router.push('/tag/list')
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('新增标签失败')
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.initTag(this.$route.query.id)
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
  .backButton:hover{
    cursor: pointer;
  }
  .editTable{
    margin: 20px;
  }

</style>
