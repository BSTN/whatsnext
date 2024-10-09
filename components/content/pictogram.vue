<template>
  <div class="pictogram">
    <div class="frame">
      <div class="grid" :style="getStyle()">
        <div class="icon" v-for="k in props.range" :class="getClass(k)">
          <Icon icon="fa6-solid:person"></Icon>
        </div>
      </div>
      <div class="labels">
        <div class="label" v-for="label in props.labels">
          <Icon icon="fa6-solid:person"></Icon>
          <div class='text'>{{ label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap'])

function getClass(k: number) {
  let klas = ''
  let accum = 0
  for (let i in props.data) {
    accum += parseInt(props.data[i])
    if (k > accum) {
      klas = `type-${i}`
    }
  }
  console.log(klas)
  return klas
}

function getStyle() {
  let columns = ''
  let rows = ''

  const rowsRange = props.rows || 4
  const totalRange = props.range || 40
  const gap = props.gap || 1

  for (let i = 0; i < rowsRange; i++) {
    rows += '1fr ';
  }
  for (let i = 0; i < (totalRange / rowsRange); i++) {
    columns += '1fr ';
  }
  return {
    'grid-template-rows': rows,
    'grid-template-columns': columns,
    gap: gap + 'rem'
  }
}

</script>

<style lang="less" scoped>
.pictogram {
  padding: 2rem 0;
}

.frame {
  .row();
  width: var(--pwidth);
  background: var(--bg2);
  border-radius: 0.5rem;
  overflow: hidden;

}

.grid {
  padding: 2rem;
  font-size: 2rem;
  display: grid;
}

.labels {
  // background: var(--bg3);
  border-top: 1px solid var(--bg);
  padding: 1rem 1.5rem;

  .label {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;

    :deep(svg) {
      font-size: 1.5rem;
    }

    .text {}

    &:nth-child(1) :deep(svg) {
      opacity: 1;
    }

    &:nth-child(2) :deep(svg) {
      opacity: 0.25;
    }

    &:nth-child(3) :deep(svg) {
      color: var(--bg3);
    }
  }
}

.icon {
  opacity: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3/5;
  position: relative;


  &.type-0 {
    opacity: .25;
  }

  &.type-1 {
    // opacity: .05;
    color: var(--bg3);
  }

  :deep(svg) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

  }
}
</style>