<template>
  <div class="labels">
    <div class="label" v-for="(label, k) in props.labels" :class="{ highlight: k === props.highlight }">
      <!-- <Icon icon="fa6-solid:person"></Icon> -->
      <div class="icon"></div>
      <div class='text'>{{ label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['labels', 'highlight'])
</script>

<style lang="less" scoped>
.labels {
  // background: var(--bg3);
  border-top: 1px solid var(--bg);
  padding: 1rem 1.5rem;

  .label {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    align-items: flex-start;
    color: var(--fg2);

    &.highlight {
      color: var(--fg);
    }

    :deep(svg) {
      font-size: 1.5rem;
    }

    .icon {
      @s: 1rem;
      width: @s;
      height: @s;
      border-radius: 100%;
      background: var(--fg);
      margin-top: 0.35rem;
    }

    .text {}

    &:nth-child(1) :deep(svg),
    &:nth-child(1) .icon {
      opacity: 1;
    }

    &:nth-child(2) :deep(svg),
    &:nth-child(2) .icon {
      opacity: 0.25;
    }

    &:nth-child(3) :deep(svg),
    &:nth-child(3) .icon {
      color: var(--bg3);
    }

    &:nth-child(3) .icon {
      background: var(--bg3);
    }
  }
}
</style>