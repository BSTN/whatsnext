<template>
  <div class="story-inline" :class="{ waiting }" v-element-visibility="onElementVisibility">
    <div class="frame">
      <Icon class="loading" icon="eos-icons:three-dots-loading"></Icon>
      <div class="head">
        <div class="image">
          <img :src="images[props.image]">
        </div>
        <div class="info">
          <div class="name">{{ props.name }}, {{ props.age }}</div>
          <div class="description">{{ props.description }}</div>
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vElementVisibility } from '@vueuse/components'
import { Icon } from '@iconify/vue'
const waiting = ref(true)
const props = defineProps(['image', 'name', 'age', 'description', 'filter'])

const imagesList = import.meta.glob('@/public/profiles/*.*')
const images = []
for (const pad in imagesList) {
  images.push(pad.replace('/public', ''))
}
function onElementVisibility(state) {
  if (state) {
    setTimeout(() => {
      waiting.value = false
    }, 2000)
  }
}

</script>

<style lang="less" scoped>
.story-inline {
  margin-bottom: 4rem;
}



.frame {
  position: relative;
  background: var(--bg2);
  width: var(--pwidth);
  max-width: var(--maxwidth);
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--fg2);
    font-size: 3rem;
    margin: 0 0.5rem;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;

    .waiting & {
      opacity: 1;
    }
  }
}

.head,
.content {
  opacity: 1;
  transition: all 0.5s ease;

  .waiting & {
    opacity: 0;
  }
}

.head {
  margin: 0;
  display: flex;
  gap: 2rem;
  border-radius: 0.5rem;
  padding: 2rem;
  width: calc(100% - 4rem);

  .image {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    object-position: center;
    border-radius: .5rem;
    border-radius: 100%;
    order: 2;
    position: absolute;
    top: 0;
    right: 0;
    margin: 2rem;
    background: var(--bg3);
    overflow: hidden;
    // border: 2px solid var(--bg3);
    // border: 1px solid var(--fg2);

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      mix-blend-mode: overlay;
      // mix-blend-mode: multiply;
    }

    // &:before,
    // &:after {
    //   content: "";
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   background: var(--bg);
    //   mix-blend-mode: lighten;
    // }

    &:before {
      z-index: 4;
      mix-blend-mode: multiply;
    }

    &.nofilter {
      border: 0;

      img {
        mix-blend-mode: normal;
        opacity: 1;
      }

      &:before,
      &:after {
        content: none;
      }
    }
  }

  .name {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    font-style: italic;
    color: var(--fg2);
  }
}

.content {
  font-style: italic;
}

@media (max-width: 50rem) {
  .frame {
    padding: 1rem 0 2rem;
    max-width: 100%;
    border-radius: 0;
  }
}
</style>