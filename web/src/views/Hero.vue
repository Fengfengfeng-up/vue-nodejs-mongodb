<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img @click="$router.push('/')" src="../assets/logo1.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div" class="d-flex ai-center">
        <span class="fs-sm text-light">更多英雄</span>
        <span class="ml-2 fs-xxl">&gt;</span>
      </router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map(v => v.name).join('/') }}</div>
        <div class="d-flex jc-between py-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="div" class="text-grey fs-sm">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 py-2 border-bottom">
          <div class="nav-item" :class="{'active': active === 0}">
            <div class="nav-link" @click="$refs.detail.swiper.slideTo(0)" >英雄初识</div>
          </div>
          <div class="nav-item" :class="{'active': active === 1}">
            <div class="nav-link" @click="$refs.detail.swiper.slideTo(1)">进阶攻略</div>
          </div>
        </div>
      </div>

      <swiper ref="detail" :options="{autoHeight: true}" @slide-change="() => active = $refs.detail.swiper.realIndex"> 
        <swiper-slide >
          <div class="p-3 bg-white boder-bottom">
            <div class="d-flex">
              <router-link class="btn flex-1 btn-lg" tag="button" to="/">
                <img
                  src="../assets/images/icon_06.png"
                  style="height: auto"
                  width="20px"
                  class="mr-3"
                />
                英雄介绍视频
              </router-link>
              <router-link class="btn flex-1 ml-2 btn-lg" tag="button" to="/">
                <img
                  src="../assets/images/icon_07.png"
                  style="height: auto"
                  width="20px"
                  class="mr-3"
                />
                一图识英雄
              </router-link>
            </div>

            <!-- skills -->
            <div class="skills bg-white mt-4">
              <div class="d-flex jc-around">
                <img
                  class="icon"
                  @click="currentSkillsIndex = i"
                  :class="{active: currentSkillsIndex === i}"
                  :src="item.icon"
                  v-for="(item, i) in model.skills"
                  :key="i"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex pt-4 pb-3">
                  <h3 class="m-0">{{ currentSkill.name }}</h3>
                  <span class="text-grey-1 ml-4">
                    (冷却值：{{currentSkill.delay}}
                    消耗：{{currentSkill.cost}})
                  </span>
                </div>
                <p>{{currentSkill.description}}</p>
                <div v-if="currentSkill.tips" class="border-bottom"></div>
                <p v-if="currentSkill.tips" class="text-grey-1">小提示：{{currentSkill.tips}}</p>
              </div>
            </div>
            <!-- end of skills -->
          </div>

          <m-card plain sprite="hero" title="出装推荐" class="hero-items">
            <div class="fs-xl">顺风出装</div>
            <div class="d-flex jc-between text-center mt-3 mb-3">
              <div v-for="item in model.items1" :key="item.name">
                <img :src="item.icon" class="icon" />
                <div class="fs-xs mt-1">{{item.name}}</div>
              </div>
            </div>
            <div class="border-bottom"></div>
            <div class="fs-xl mt-3">逆风出装</div>
            <div class="d-flex jc-between text-center mt-3">
              <div v-for="item in model.items2" :key="item.name">
                <img :src="item.icon" class="icon" />
                <div class="fs-xs mt-1">{{item.name}}</div>
              </div>
            </div>
          </m-card>

          <m-card plain sprite="hero" title="使用技巧">
            <div class="m-0">{{model.usageTips}}</div>
          </m-card>

          <m-card plain sprite="hero" title="对抗技巧">
            <div class="m-0" style="line-height: 1.3rem">{{model.battleTips}}</div>
          </m-card>

          <m-card plain sprite="hero" title="团战思路">
            <div class="m-0" style="line-height: 1.3rem">{{model.usageTips}}</div>
          </m-card>

          <m-card plain sprite="hero" title="英雄关系">
            <div class="fs-xl">最佳搭档</div>
            <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
              <img :src="item.hero.avatar" height="50" />
              <p class="flex-1 ml-3 mr-1 m-0">{{item.description}}</p>
            </div>
            <div class="border-bottom mt-4"></div>

            <div class="fs-xl mt-2 pt-1">被谁克制</div>
            <div v-for="item in model.restrained" :key="item.name" class="d-flex pt-3">
              <img :src="item.hero.avatar" height="50" />
              <p class="flex-1 ml-3 m-0 mt-2">{{item.description}}</p>
            </div>
            <div class="border-bottom mt-4"></div>

            <div class="fs-xl mt-2 pt-1">克制谁</div>
            <div v-for="item in model.restrain" :key="item.name" class="d-flex pt-3 mt-1">
              <img :src="item.hero.avatar" height="50" />
              <p class="flex-1 ml-3 mr-1 m-0">{{item.description}}</p>
            </div>
          </m-card>
        </swiper-slide>

        <swiper-slide>
          <m-video-card 
            v-for="(item,i) in model.moreTips" 
            :key="i" 
            :moreTips="item"
            detail
            >
          </m-video-card>
        </swiper-slide>

      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true } // 接受路由上的 id
  },
  data() {
    return {
      model: null,
      currentSkillsIndex: 0,
      active: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillsIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgb(2, 2, 8)
    ); // 黑色背景透明度从0到1
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, "white");
      border-radius: 50%;
      &.active {
        border-color: map-get($colors, "primary");
      }
    }
  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>