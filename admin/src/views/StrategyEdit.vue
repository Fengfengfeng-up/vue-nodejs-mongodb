<template>
  <div class>
    <h1>{{ id ? "编辑" : "新建" }}图文攻略</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题" style="width: 500px">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-select v-model="model.categories">
          <el-option
            v-for="item of categories"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="跳转链接" style="width: 500px">
        <el-input v-model="model.href"></el-input>
      </el-form-item>

      <el-form-item label="banner" style="width: 500px">
        <el-input v-model="model.banner"></el-input>
      </el-form-item>

      <el-form-item label="发布日期" style="width: 500px">
        <el-input v-model="model.date"></el-input>
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
      model: {},
      categories: []
    }
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        console.log("修改");
        res = await this.$http.put(`rest/strategies/${this.id}`, this.model); // 修改
      } else {
        res = await this.$http.post("rest/strategies", this.model); // 新增
      }

      console.log(res.data);

      this.$router.push("/strategies/list");
      this.$message({
        // 保存成功弹框
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/strategies/${this.id}`); // 获取被点击的数据
      this.model = res.data;
      // console.log(res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`); // 获取攻略分类
      this.categories = res.data;
      console.log(this.categories);
    },
  },
  created() {
    this.id && this.fetch(); // 前面的条件满足，即有id才执行 this.fetch()
    this.fetchCategories()
  }
};
</script>
