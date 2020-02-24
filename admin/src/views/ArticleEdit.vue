<template>
  <div class>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
          <!-- :label是显示的值，:value是选择的真实值 -->
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- 使用富文本编辑器插件 npm i vue2-editor --save -->
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    // 由路由传来的id
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        console.log("修改");
        res = await this.$http.put(`rest/articles/${this.id}`, this.model); // 修改
      } else {
        res = await this.$http.post("rest/articles", this.model); // 新增
      }

      console.log(res.data);

      this.$router.push("/categories/list");
      this.$message({
        // 保存成功弹框
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`); // 获取被点击的数据
      this.model = res.data;
      console.log(res.data);
    },
    async fetchCategories() {
      // 获取所属分类
      const res = await this.$http.get(`rest/categories`); // 获取被点击的数据
      this.categories = res.data;
      console.log(res.data);
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      // 提交表单数据 如果文章里有图片，直接上传图片文件, 不将图片转为编码
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      console.log(res.data);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.id && this.fetch(); // 前面的条件满足，即有id才执行 this.fetch()
    this.fetchCategories();
  }
};
</script>