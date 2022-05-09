<template>
<div class="box">
  <el-card class="card">
  <h3 slot="header" class="title">后台登陆</h3>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
  >
    <el-form-item
    label="用户名"
    label-width="80px"
    prop="name"

    >
      <el-input
      type="input"
      v-model="form.name"
      placeholder="请输入用户名"
      autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item
    label="密 码"
    label-width="80px"
    prop="passwd"
    >
      <el-input
      type="password"
      v-model="form.passwd"
      autocomplete="off"
      placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-button type="primary" @click="handleSubmit('form')" :loading='loading'>登 录</el-button>
  </el-form>
</el-card>
</div>

</template>

<script>
/*
登录功能实现
判断用户名是否存在 -> 不存在，status为-1，message为用户名不存在
  -> 存在，判断密码是否正确 -> 错误，status为-1，message为密码错误
  -> 正确
  -> status为0，生成token存于message中返回
*/

import { userLoginAPI } from '@/api/userApi.js'

export default {
  name: 'UserLogin',
  data () {
    return {
      form: {
        name: '',
        passwd: ''
      },
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: blur }
        ]
      }
    }
  },
  methods: {
    login () {
      return userLoginAPI(this.form)
        .then(res => {
          console.log(res)
          const data = res.data
          if (data.status === -1) this.$message.error(data.message)
          else {
            this.$store.commit('clearMenu')
            this.$store.commit('setMenu', data.menu)
            this.$store.commit('addMenu', this.$router)
            const token = data.message
            this.$store.commit('setToken', token)
            this.$router.push({ name: 'home', query: { name: data.name } })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('登录失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSubmit (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //  this.info.html = this.info.markdown
          this.login()
        } else {
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .box{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(248, 245, 245);

    .card{
      width: 400px;
      height: 270px;
      margin-top: 160px;

      .title{
        text-align: center;
      }

      .el-form{
        text-align: center;

      }
    }
  }
</style>
