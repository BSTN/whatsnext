<template>
  <div class="h1 chapter" :id="hash">
    <div class="notsticky" ref="el">
      <div class="frame">
        <ContentSlot :use="$slots.default" unwrap="p"></ContentSlot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import kebabCase from 'lodash/kebabCase'
import { useElementBounding } from '@vueuse/core'
const el = ref(null)
const { top } = useElementBounding(el)
const slots = useSlots();
function getTextFromVNode(vnode) {
  if (typeof vnode.children === 'string') {
    return vnode.children;
  } else if (vnode.children.default) {
    const nodes = vnode.children.default();
    return nodes.map(getTextFromVNode).join('');
  }
}
const hash = computed(() => {
  return kebabCase(slots.default().map(getTextFromVNode).join(""))
})
</script>

<style lang="less" scoped>
.chapter {
  max-width: none;
  border-top: 1px solid var(--bg2);
  position: relative;
  margin: 8rem 0 4rem;
  padding: 4rem 0 0;
  width: 100%;
}

.sticky,
.notsticky {
  background: var(--bg);
  padding: 0.75rem 1rem;
  text-align: center;
}

.notsticky {
  font-size: 2rem;
}
</style>