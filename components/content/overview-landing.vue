<template>
  <div class="overview-landing">
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.overview-landing {
  height: calc(90vh - 4rem);
  display: flex;
  background: var(--bg2);
  padding: 4rem 0;
  align-items: flex-end;
  align-items: center;
  margin-bottom: 4rem;
  font-size: 1.5rem;

  .slot {
    .row();

    :deep(p) {
      margin: 0 auto 1rem auto;
      width: 32em;
    }
  }
}
</style>