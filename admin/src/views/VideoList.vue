<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="videos">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="视频名称"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- scope.row 表示当前这一行的数据  -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/videos/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/videos");
      this.videos = res.data;
      console.log(res.data,"请求成功")
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/videos/${row._id}`)
        console.log(res)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch()
      }).catch(() => {}); // 如不写catch()，则在点击取消时会报错
    }
  },
  created() {
    this.fetch()
  }
};
</script>