<template>
  <div class>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({},)">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转连接(URL)">
              <el-input v-model="item.url" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="图标" style="margin-top: 1rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              ><!-- $set(item, 'image', res.url) 使用vue里的显式赋值 -->
              
                <!-- 有图片就显示地址，没有显示 +  -->
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        console.log("修改");
        res = await this.$http.put(`rest/ads/${this.id}`, this.model); // 修改
      } else {
        res = await this.$http.post("rest/ads", this.model); // 新增
      }

      console.log(res.data);

      this.$router.push("/ads/list");
      this.$message({
        // 保存成功弹框
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`); // 获取被点击的数据
      this.model = Object.assign({}, this.model, res.data);
      console.log(res.data);
    }
  },
  created() {
    this.id && this.fetch(); // 前面的条件满足，即有id才执行 this.fetch()
  }
};
</script>