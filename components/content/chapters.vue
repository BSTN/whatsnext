<template>
  <div class="chapters">
    <div class="frame">
      <ClientOnly>
        <div class="chapter" v-for="chapter in chapters">{{ chapter }}</div>
      </ClientOnly>
    </div>
  </div>
</template>
<script lang="ts" setup>

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

  .chapter {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1em;

    &:before {
      content: "•";
      margin-right: 1em;
    }
  }
}
</style>