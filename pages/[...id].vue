<template>
  <div class="index" :class="[{ top: !nottop, nottop, mounted }, direction]">
    <ContentDoc :path="pad" />
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
const route = useRoute()
const { locale } = useI18n()

const pad = computed(() => {
  const langcode = locale.value
  const p = route.path === '/' ? '/index' : route.path
  return p + '.' + langcode
})

// scroll directions
const direction = ref('')
const { y } = useWindowScroll()
let prevy = 0
const nottop = computed(() => {
  direction.value = (y.value > prevy) ? 'scroll-down' : 'scroll-up'
  prevy = y.value
  return y.value > 150
})

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
  for (let i = 0; i < 10; i++) {
    document.documentElement.classList.remove(`theme`)
    document.documentElement.classList.remove(`theme-${i}`)
  }
})
</script>

<style lang="less" scoped>
.index {
  opacity: 0;
  transition: opacity 1s ease;

  &.mounted {
    opacity: 1;
  }
}
</style>