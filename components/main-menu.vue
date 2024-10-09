<template>
  <div class="main-menu">
    <!-- <div class="chapter">{{ chapterName }}</div> -->
    <TheLogo>Wat nu?</TheLogo>
  </div>
</template>

<script lang="ts" setup>
const chapterList = ref([])

onMounted(() => {
  const chapters = document.body.querySelectorAll('.chapter')
  chapters.forEach((el) => {
    chapterList.value.push({
      top: el.getBoundingClientRect().top,
      html: el.innerText
    })
  })
})

</script>

<style lang="less" scoped>
.main-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 0.5rem 3rem;
  gap: 1rem;
  z-index: 10;
  transition: all 0.2s ease;
  pointer-events: none;

  >.chapter {
    flex: 1;
  }

  &.hidden {
    // opacity: 0;
    // pointer-events: none;
  }
}
</style>