<template>
  <div>
    <div class="topbar bg-black pt-2 pb-1 px-3 d-flex ai-center">
      <router-link to="/" class="pl-2"><img class="logo" src="../assets/logo1.png" height="30"></router-link>
      <div class="px-2 ml-1 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn mr-1 fs-xs download bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2 ">
      <div class="nav nav-inverse jc-around pb-1">
        <div class="nav-item" @click="active=0" :class="{active: active === 0}">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item" @click="active=1" :class="{active: active === 1}">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item" @click="active=2" :class="{active: active === 2}">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view to="/"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss">
  .topbar {
    position: sticky; // 吸顶效果
    top: 0; 
    width: 100%;
    /* position: fixed;
    top: 0; */
    z-index: 999;
  }
  .logo {
    border-radius: 20% 20% 0 20%;
  }
  .download {
    border-radius: 5%;
    padding: .384615rem .615385rem;
  }
</style>
