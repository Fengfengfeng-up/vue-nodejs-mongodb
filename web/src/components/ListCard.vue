<template>
      <m-card :hero="hero" :sprite="sprite" :title="title">
      <div class="nav jc-between">
          <div class="nav-item" :class="{active: active === i}"
          v-for="(category, i) in categories" :key="i">
            <!-- $refs.list.swiper.slideTo(i) swiper的一个方法，表示让swiper滚动到当前i这个索引值 -->
            <div class="nav-link" @click="$refs.list.swiper.slideTo(i)">{{ category.name }}</div>
          </div>
        </div>
        <div class="pt-2">

          <!-- 
            ref 类似html中的id，在vue中使用找到这个组件   $refs.list.swiper.realIndex 表示把当前 swiper index索引值赋值给 active
            :options="{autoHeight: true} 自动高度
          -->
          <swiper ref="list" :options="{autoHeight: true}" @slide-change="() => active = $refs.list.swiper.realIndex"> 
            <swiper-slide v-for="(category, i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
        </div>
        <div class="fs-sm text-center border-top  text-grey-2" v-if="!hero && !categories">点击查看更多</div>
    </m-card>
</template>

<script>
export default {
  props: {
    sprite: {type: String, required: true},
    title: {type: String, required: true},
    categories: {type: Array, required: true},
    hero: {type: Boolean},
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>