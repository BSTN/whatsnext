<template>
  <main>
    <transition name="fade">
      <ContentRendererMarkdown :value="pageData.data" v-if="pageData && !pageData.loading"
        :key="String(route.query.id)" />
    </transition>
  </main>
</template>
<script lang="ts" setup>
const route = useRoute()
const { pages } = await usePages()
const pageData = computed(() => {
  if (!(page.value in pages.value)) {
    return false
  }
  document.documentElement.classList.add('theme')
  document.documentElement.classList.add(`theme-${pages.value[page.value].data?.theme}`)
  return pages.value[page.value]
})
const page = computed(() => {
  return String(route.query.id)
})
</script>
<style lang="less" scoped>
main {
  background: var(--bg);
}
</style>
