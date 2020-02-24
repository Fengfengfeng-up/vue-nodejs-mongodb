<template>
  <div class="">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
  <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="上级分类">
      <el-select v-model="model.parent">
        <el-option v-for="item in parents" :key="item._id" 
        :label="item.name" :value="item._id"></el-option>
        <!-- :label是显示的值，:value是选择的真实值 -->
      </el-select>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="model.name"></el-input>
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
        res = await this.$http.put(`rest/categories/${this.id}`, this.model) // 修改
      } else {
        res = await this.$http.post('rest/categories', this.model) // 新增
      }

      console.log(res.data)

      this.$router.push('/categories/list')
      this.$message({ // 保存成功弹框
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`) // 获取被点击的数据
      this.model = res.data
      console.log(res.data)
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`) // 获取被点击的数据
      this.parents = res.data
      console.log(res.data)
    }
  },
  created() {
    this.id && this.fetch() // 前面的条件满足，即有id才执行 this.fetch()
    this.fetchParents()
  }
}
</script>