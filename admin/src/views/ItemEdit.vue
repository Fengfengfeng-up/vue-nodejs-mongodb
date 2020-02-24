<template>
  <div class>
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称" style="width: 500px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- action：提交图片到对应的接口，后台返回图片地址，即model.icon -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()" 
          :show-file-list="false"
          :on-success="afterUpload"
        > <!-- getAuthHeaders() 在main.js文件里定义的全局方法,给 element 自带的请求加上 token
              uploadUrl 也在main.js里
           -->
          <!-- 有图片就显示地址，没有显示 +  -->
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 由路由传来的id
    id: {}
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url) // 给 model 添加一条 url 属性,值为 res.url
      // this.model.icon = res.url 不能直接添加 
    },
    async save() {
      let res;
      if (this.id) {
        console.log("修改")
        res = await this.$http.put(`rest/items/${this.id}`, this.model) // 修改
      } else {
        res = await this.$http.post("rest/items", this.model) // 新增
      }

      console.log(res.data)

      this.$router.push("/items/list")
      this.$message({
        // 保存成功弹框
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`) // 获取被点击的数据
      this.model = res.data
      console.log(res.data)
    }
  },
  created() {
    this.id && this.fetch() // 前面的条件满足，即有id才执行 this.fetch()
  }
};
</script>
