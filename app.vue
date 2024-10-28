<template>
  <div class="app" :class="[{ top: !nottop, nottop, mounted }, direction]">
    <NuxtPage class="page" />
  </div>
</template>
<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
const route = useRoute()
const router = useRouter()

// scroll directions
const direction = ref('')
const { y } = useWindowScroll()
let prevy = 0
const nottop = computed(() => {
  direction.value = (y.value > prevy) ? 'scroll-down' : 'scroll-up'
  prevy = y.value
  return y.value > 150
})
// end

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>
<style lang="less">
@import '@/less/elements.less';

.app {
  margin: 0 auto 10rem;
}
</style>