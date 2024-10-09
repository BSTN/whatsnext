<template>
  <div class="warning">
    <div class="frame">
      <Icon class="icon" icon="eos-icons:ai"></Icon>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style lang="less" scoped>
.warning {
  border-top: 1px solid var(--bg2);
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg2);
}

.frame {
  width: var(--pwidth);
  max-width: calc(100% - 2rem);
  padding: 3rem 2rem;
  border-radius: 0.5rem;
  background: var(--bg);
  position: relative;

  :deep(p) {
    margin: 0 auto;
  }
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  font-size: 2rem;
  color: var(--bg3);
}
</style>