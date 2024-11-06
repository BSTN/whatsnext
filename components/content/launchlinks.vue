<template>
  <div class="launchlinks">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.launchlinks {
  :deep(a) {
    display: block;
    background: var(--fg);
    color: var(--bg);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    &:hover {
      background-color: var(--link);
    }
  }
}
</style>