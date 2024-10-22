<template>
  <ClientOnly>
    <div class="page-list">
      <NuxtLink :to="`/page?id=${item.name}`" v-for="item in list" class="page theme"
        :class="[`theme-${pages[item.name]?.data?.theme}`]">
        <div class="info" v-if="!pages[item.name].loading">
          {{ pages[item.name].data.title }}
        </div>
        <button>
          <icon icon="mdi:arrow-right-circle"></icon>
        </button>
      </NuxtLink>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const { list, pages, loadList } = await usePages()
onMounted(() => {
  loadList()
})
</script>

<style lang="less" scoped>
.page-list {
  padding: 4rem 0;
  .row();
  display: flex;
  gap: 4rem;
}

.page {
  flex: 1;
  border-radius: 0.25rem;
  display: block;
  width: 8em;
  aspect-ratio: 3/4;
  background: var(--bg);
  color: var(--fg);
  padding: 1rem;
  font-size: 2rem;
  text-decoration: none;
  transition: all 0.5s @easeInOutExpo;
  display: flex;
  flex-direction: column;

  .info {
    flex: 1;
    line-height: 1.2;
  }

  button {
    text-align: right;
  }

  &:hover {
    // text-decoration: underline;
    transform: scale(1.05);
  }
}
</style>