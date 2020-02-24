<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue" @click="$router.push('/')"></div>
      <strong class="flex-1 text-blue pl-1 pr-3 text-ellipsis">{{model.title}}</strong>
      <div class="text-grey fs-xs">2020-02-18</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-2 link pb-4 mb-4">
      <div class="d-flex ai-center">
        <div class="article-link"></div>
        <strong class="text-blue fs-xl ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1 d-flex"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
        >
          <span class="text-ellipsis mr-3">{{item.title}}</span>
          <span class="fs-sm text-grey-1 ml-3">{{ item.createdAt | date}}</span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import dayjs from "dayjs"; // 使用 dayjs 处理时间
export default {
  props: {
    id: { required: true }
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD"); // 将 val 格式化为 08/15 形式
    }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: "fetch" // 监听id变化 执行 fetch 方法， 两种写法
    /* id(){
      this.fetch()
    } */
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.923077rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .article-link {
    background: url(../assets/images/lin.png) no-repeat;
    background-size: contain;
    width: 1.846154rem;
    height: 1.846154rem;
  }
}
</style>