<template>
  <div class="card p-3 bg-white mt-3">
      <div class="card-header d-flex ai-center" :class="{'border-bottom': !plain && !hero, 'pb-3': !plain}">
        <i class="sprite" :class="`sprite-${sprite}`"></i>
        <!-- <i class="iconfont fs-md" :class="`icon-${icon}`"></i> -->
        <div class="fs-xl flex-1 px-2 ">
          <span :class="{'title-bold': plain}">{{ title }}</span>
        </div>
        <i class="iconfont icon-moreread fs-xxl" v-if="!plain"></i>
      </div>
      <div v-if="hero" class="hero-banner border-bottom pt-1 pb-3">
        <img src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20200108/20796372351730.jpg" height="auto" width="100%">
      </div>
      <div class="card-body pt-3">
        <slot></slot> <!-- 使用插槽预留空间，使用该组件时，其他内容可以显示在这里面 -->
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    sprite: { type: String},
    plain: { type: Boolean },
    hero: { type: Boolean }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.card {
  border-bottom: 1px solid $border-color;
}
.title-bold {
  font-weight: bold;
}
</style>