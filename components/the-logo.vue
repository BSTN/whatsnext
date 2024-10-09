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
  padding: 0 0.5em;
  border-radius: 0.25em;
  font-style: italic;
  font-weight: 600;
}
</style>