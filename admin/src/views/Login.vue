<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      // sessionStorage.token = res.data.token 关闭浏览器后token消失
      localStorage.token = res.data.token // 关闭后还在，只要是同一个IP
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
      console.log(res)
    }
  }
}
</script>
<style>
  .login-card {
    width: 25rem;
    margin: 5rem auto;
  }
</style>