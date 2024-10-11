<template>
  <div class="chapters">
    <div class="frame">
      <ClientOnly>
        <NuxtLink :to="`#${kebabCase(chapter)}`" class="chapter" v-for="chapter in chapters">{{ chapter }}
        </NuxtLink>
      </ClientOnly>
    </div>
  </div>
</template>
<script lang="ts" setup>
import kebabCase from 'lodash/kebabCase'

const chapters = ref([])

if (import.meta.client) {
  const list = document.body.querySelectorAll('.chapter');
  list.forEach(el => {
    const txt = el.children[0].innerText
    chapters.value.push(txt)
  })
}

</script>
<style lang="less" scoped>
.chapters {
  border-top: 1px solid var(--bg2);
}

.frame {
  .row();
  margin: 10vh auto;
  position: relative;

  &:before {
    content: "";
    border-left: 1px solid var(--fg2);
    position: absolute;
    top: 1rem;
    left: 0.4rem;
    height: calc(100% - 2rem);
  }

  .chapter {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 1em;
    display: block;
    text-decoration: none;

    &:before {
      content: "•";
      margin-right: 1em;
    }
  }
}
</style>