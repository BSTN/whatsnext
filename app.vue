<template>
  <div class="app">
    <NuxtPage class="page" />
  </div>
</template>
<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core';

onKeyStroke(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], (ev) => {
  if (ev.metaKey || ev.shiftKey || ev.ctrlKey || ev.altKey) return false
  for (let i = 0; i < 10; i++) {
    document.documentElement.classList.remove(`colors-${i}`)
  }
  if (ev.key !== '0') {
    document.documentElement.classList.add(`colors-${ev.key}`)
  }
})
</script>
<style lang="less">
@import '@/less/elements.less';

.app {
  margin: 0 auto 10rem;
}
</style>