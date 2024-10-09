<template>
  <div class="h1 chapter" :class="{ stick: top < 0 }">
    <div class="sticky">
      <div class="frame">
        <ContentSlot :use="$slots.default" unwrap="p"></ContentSlot>
      </div>
    </div>
    <div class="notsticky" ref="el">
      <div class="frame">
        <ContentSlot :use="$slots.default" unwrap="p"></ContentSlot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core'
const el = ref(null)
const { top } = useElementBounding(el)

</script>

<style lang="less" scoped>
.chapter {
  max-width: none;
  border-top: 1px solid var(--bg2);
  position: relative;
  margin: 8rem 0 4rem;
  padding: 4rem 0 0;
  width: 100%;
}

.sticky,
.notsticky {
  background: var(--bg);
  padding: 0.75rem 1rem;
  text-align: center;
}

.frame {
  // .row();
}

.notsticky {
  font-size: 2rem;
}

.sticky {
  position: fixed;
  top: 0;
  opacity: 0;
  top: 0;
  z-index: 9;
  border-bottom: 1px solid var(--bg2);
  font-size: 1rem;
  width: 100%;
  transition: all 0.25s ease;
  color: var(--fg2);

  .stick & {
    opacity: 1;

    .hidden & {
      opacity: 0;
    }
  }
}
</style>