<template>
  <main>
    <transition name="fade">
      <ContentRendererMarkdown :value="pageData.data" v-if="pageData && !pageData.loading" :key="page + locale" />
    </transition>
  </main>
</template>
<script lang="ts" setup>
const route = useRoute()
const { pages, loadList } = await usePages()
const { locale } = useI18n()

const pageData = computed(() => {
  if (!(page.value in pages.value)) {
    return false
  }
  document.documentElement.classList.add('theme')
  document.documentElement.classList.add(`theme-${pages.value[page.value].data?.theme}`)
  return pages.value[page.value]
})
const page = computed(() => {
  if (!Object.keys(pages.value).find(x => x === `${route.query.id}.${locale.value}.md`)) {
    console.log('language not found', Object.keys(pages.value))
    return String(route.query.id + '.nl.md')
  }
  return String(`${route.query.id}.${locale.value}.md`)
})
onMounted(() => {
  console.log('onmounted', locale.value)
  // again, to be sure:
  loadList().catch(console.warn)
})
</script>
<style lang="less" scoped>
main {
  background: var(--bg);
}
</style>
