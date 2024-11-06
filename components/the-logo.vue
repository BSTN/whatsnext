<template>
  <div class="the-logo">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>


</script>
<style lang="less" scoped>
.the-logo {
  background: var(--fg);
  color: var(--bg);
  display: inline-block;
  line-height: 1.6;
  padding: 0.125em 0.75em;
  border-radius: 0.25em;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-family: 'Inter', 'helvetica neue', Helvetica, sans-serif;
}
</style>