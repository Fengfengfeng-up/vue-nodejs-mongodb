<template>
  <div class="p-2 bg-white" :class="{'border-bottom': detail}">
    <div class="d-flex" :class="{'p-2': detail}">
      <a :href="moreTips.href" class="video">
        <i v-if="!strategy" class="video-start"></i>
        <img :src="moreTips.banner" width="120px" height="75px" />
      </a>
      <div class="d-flex flex-column ml-3 flex-1 jc-between">
        <span
          class="fs-lg text-dark-1"
          :class="{'pr-2': !detail, 'fs-lg': strategy}"
        >{{ moreTips.title }}</span>

        <div class="d-flex fs-xs m-0 jc-between video-number-color">
          <div v-if="!strategy" class="d-flex ai-center">
            <span class="video-icon mr-1"></span>
            <span>{{ moreTips.count }}</span>
          </div>
          <div class="d-flex ai-center" :class="{'px-2': !strategy}">
            <span :class="{'text-grey': strategy}">{{ moreTips.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    moreTips: { type: Object, required: true },
    detail: { type: Boolean },
    strategy: { type: Boolean }
  }
};
</script>
