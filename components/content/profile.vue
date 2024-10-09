<template>
  <div class="profile">
    <div class="frame">
      <div class="field" v-for="(content, name) in props.fields">
        <label>{{ name }}</label>
        <div class="content">{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['fields'])
</script>

<style lang="less" scoped>
.profile {
  padding-top: 0rem;
  padding-bottom: 0rem;

  .frame {
    .row();
    width: var(--pwidth);
    background: var(--bg2);
    padding: 2rem;
    border-radius: 0.5rem;
  }

  .field {
    display: flex;
    border-bottom: 1px solid var(--bc);
    padding: .5rem 0;

    &:first-child {
      border-top: 1px solid var(--bc);
    }

    label {
      width: 10rem;
      margin: 0;
    }
  }
}
</style>