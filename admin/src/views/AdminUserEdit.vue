<template>
  <div class="">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
  <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="用户名">
      <el-input v-model="model.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="text" v-model="model.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  props: { // 由路由传来的id
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  methods: {
    async save() {
      let res
      if(this.id) {
        console.log("修改")
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model) // 修改
      } else {
        res = await this.$http.post('rest/admin_users', this.model) // 新增
      }

      console.log(res.data)

      this.$router.push('/admin_users/list')
      this.$message({ // 保存成功弹框
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`) // 获取被点击的数据
      this.model = res.data
      console.log(res.data)
    }
  },
  created() {
    this.id && this.fetch() // 前面的条件满足，即有id才执行 this.fetch()
  }
}
</script>