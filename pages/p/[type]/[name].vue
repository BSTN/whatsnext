<template>
  <main>
    <preloading v-model="loaded"></preloading>
    <transition name="fade">
      <div v-if="current && loaded">
        <ContentRendererMarkdown :value="current.data" :key="`${route.params.type}-${route.params.name}`" />
      </div>
    </transition>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute()
const { current } = useProfiles()
const loaded = ref(false)
if (import.meta.client) {
  onMounted(() => {
    document.documentElement.classList.forEach((v, k) => {
      if (v.match('theme')) {
        document.documentElement.classList.remove(v)
      }
    })
    document.documentElement.classList.add('theme')
    document.documentElement.classList.add(`theme-${current.value.data?.theme}`)
  })
  onBeforeUnmount(() => {
    document.documentElement.classList.forEach((v, k) => {
      if (v.match('theme')) {
        document.documentElement.classList.remove(v)
      }
    })
  })
}
</script>

<style lang="less" scoped></style>