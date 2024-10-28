<template>
  <div class="quote">
    <div class="frame">
      <div class="info">
        <div class="image">
          <NuxtImg :src="images[props.image]"></NuxtImg>
        </div>
        <div class="name">{{ props.name || 'Peter de Groot' }}</div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['name', 'image'])
const imagesList = import.meta.glob('@/public/profiles/*.*')
const images = []
for (const pad in imagesList) {
  images.push(pad.replace('/public', ''))
}
</script>

<style lang="less" scoped>
.quote {
  padding: 0 0 4rem;

  .frame {
    border: 1px solid var(--bc);
    background: var(--bg2);
    .row();
    width: var(--pwidth);
    border-radius: 0.25rem;
    display: flex;
    padding: 2rem;
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .image {
    @s: 4rem;
    border-radius: 100%;
    width: @s;
    height: @s;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      mix-blend-mode: overlay;
      opacity: 0.5;
    }
  }

  .name {
    font-size: 0.75rem;
    color: var(--fg2);
    text-align: center;
  }
}

.content {
  font-style: italic;

  :deep(p) {
    width: 100%;
  }
}
</style>