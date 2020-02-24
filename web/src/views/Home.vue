<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/6e1abaf05478eb6c79fc2b4d9fb59204.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/cd96d9800c6c8176fbb45b826a5ca6e8.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/e9bc9da4d0a55f968ee5d859c9ba23c0.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap" :class="{'open': !openStatus}">
        <div class="nav-item mb-3" v-for="(item, i) in entyList" :key="i">
          <i :class="'sprite sprite-'+ item.classname"></i>
          <div class="py-2">{{item.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="openStatus = !openStatus">
        <i class="sprite sprite-arrow mr-1" :class="{'inverse': !openStatus}"></i>
        {{openStatus? '收起' : '展开'}}
      </div>
    </div>
    <!-- end of entryList -->

    <m-list-card sprite="news" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <!-- #items代表在 ListCard 组件里的插槽名，这里的 category 由插槽的属性category 传递而来，实现数据穿透 -->
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card hero sprite="hero" title="英雄列表" :categories="heroesCats">
      <template #items="{category}">
        <!-- #items代表在 ListCard 组件里的插槽名，这里的 category 由插槽的属性category 传递而来，实现数据穿透 -->
        <div class="d-flex flex-wrap p-2" style="margin: 0 -0.5rem">
          <router-link :to="`/heroes/${hero._id}`" tag="div" class="p-2 fs-lg text-center" style="width: 20%" v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100"/>
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card sprite="videos" title="精彩视频" :categories="videosCats">
      <template #items="{category}">
        <!-- #items代表在 ListCard 组件里的插槽名，这里的 category 由插槽的属性category 传递而来，实现数据穿透 -->
        <div class="d-flex flex-wrap mt-3" style="margin: 0 -0.5rem">
          <m-video-card :moreTips="video" v-for="(video, i) in category.videoList" :key="i">
          </m-video-card>
        </div>
      </template>
    </m-list-card>
    

    <m-list-card sprite="strategy" title="图文攻略" :categories="strategiesCats">
      <template #items="{category}">
        <!-- #items代表在 ListCard 组件里的插槽名，这里的 category 由插槽的属性category 传递而来，实现数据穿透 -->
        <div class="d-flex flex-wrap mt-3" style="margin: 0 -0.5rem">
          <m-video-card :moreTips="strategy" strategy v-for="(strategy, i) in category.strategyList" :key="i">
          </m-video-card>
        </div>
      </template>
    </m-list-card>

    
  </div>
</template>

<script>
import dayjs from "dayjs"; // 使用 dayjs 处理时间

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD"); // 将 val 格式化为 08/15 形式
    }
  },
  data() {
    return {
      openStatus: false,
      entyList: [
        {
          classname: "blz",
          name: "爆料站"
        },
        {
          classname: "gsz",
          name: "故事站"
        },
        {
          classname: "zbsc",
          name: "周边商城"
        },
        {
          classname: "tyf",
          name: "体验服"
        },
        {
          classname: "xrzq",
          name: "新人专区"
        },
        {
          classname: "rycc",
          name: "荣耀·传承"
        },
        {
          classname: "mnzzlk",
          name: "模拟战资料库"
        },
        {
          classname: "wzyd",
          name: "王者营地"
        },
        {
          classname: "gzh",
          name: "公众号"
        }
      ],
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          delay: 2500, //自动切换的时间间隔，单位ms
          stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
          disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay。
          reverseDirection: true, //开启反向自动轮播。
          waitForTransition: true //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
        }
      },
      swiperSlides: [1, 2, 3],
      newsCats: [],
      heroesCats: [],
      videosCats: [],
      strategiesCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.heroesCats = res.data;
    },
    async fetchVideosCats() {
      const res = await this.$http.get("videos/list");
      this.videosCats = res.data;
    },
    async fetchStrategiesCats() {
      const res = await this.$http.get("strategies/list");
      this.strategiesCats = res.data;
      console.log(this.strategiesCats)
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroesCats();
    this.fetchVideosCats();
    this.fetchStrategiesCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 2px;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
  .open {
    height: 5rem;
    overflow: hidden;
  }
}
</style>
