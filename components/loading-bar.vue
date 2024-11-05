<template>
  <div class="loading-bar" :class="{ active: model, remove: props.remove }">
    <div class="bar"
      :style="{ animationDuration: (props.duration || 1000) + 'ms', animationDelay: (props.delay || 0) + 'ms', }"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['delay', 'duration', 'remove'])
const model = defineModel()
const emits = defineEmits(['done'])
watch(model, (val) => {
  if (val) {
    setTimeout(() => {
      emits('done')
    }, (props.duration || 1000) + (props.delay || 0))
  }
})
</script>

<style lang="less" scoped>
.loading-bar {
  position: relative;
  height: 0.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  background: var(--bg2);
  width: 16rem;
  max-width: 100%;
  margin: 1rem auto;

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: var(--loadingbg, var(--link));
  }

  &.remove {
    display: none;
  }

  &.active {
    &.remove {
      display: block;
    }

    .bar {
      animation: loadin 1s @easeInSine 0s 1 forwards;

      @keyframes loadin {
        to {
          width: 100%;
          background: var(--loadingbgto, var(--link));
        }
      }
    }
  }
}
</style>