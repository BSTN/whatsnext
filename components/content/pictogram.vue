<template>
  <div class="pictogram" :class="{ open, button: props.button }">
    <div class="buttonframe" v-if="props.button && props.buttontext">
      <button @click="open = true">{{ props.buttontext }}</button>
    </div>
    <div class="fullscreenframe" v-if="open || !props.button">
      <button @click="open = false" v-if="props.button" class="close">
        <icon icon="iconamoon:close-bold"></icon>
      </button>
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
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap', 'button', 'buttontext'])
const open = ref(false)

function getClass(k: number) {
  let klas = ''
  let accum = 0
  for (let i in props.data) {
    accum += parseInt(props.data[i])
    if (k > accum) {
      klas = `type-${i}`
    }
  }
  return klas
}

function getStyle() {
  let columns = ''
  let rows = ''

  const rowsRange = props.rows || 4
  const totalRange = props.range || 40

  for (let i = 0; i < rowsRange; i++) {
    rows += '1fr ';
  }
  for (let i = 0; i < (totalRange / rowsRange); i++) {
    columns += '1fr ';
  }
  return {
    'grid-template-rows': rows,
    'grid-template-columns': columns,
  }
}

</script>

<style lang="less" scoped>
.pictogram {
  padding: 2rem 0;
}



.buttonframe {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: var(--bg2);
    padding: 1rem 2rem;

    &:hover {
      color: var(--fg);
      background: var(--bg3);
    }
  }
}

.button .fullscreenframe {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;


  .close {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.5rem;
    margin: 1rem;
  }
}

.frame {
  .row();

  // width: var()
  background: var(--bg2);
  border-radius: 0.5rem;
  overflow: hidden;

}

.grid {
  padding: 2rem;
  font-size: 2rem;
  display: grid;
  gap: 1rem;

  @media (max-width: 50rem) {
    gap: .5rem;
    padding: 1rem;
  }
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