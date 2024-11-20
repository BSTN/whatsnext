<template>
  <div class="combined-charts">
    <div class="frame">
      <div class="tabs">
        <button :class="{ active: tab === 'text' }" @click="tab = 'text'">
          <Icon icon="icon-park-solid:text"></Icon>
        </button>
        <button :class="{ active: tab === 'pie' }" @click="tab = 'pie'">
          <Icon icon="fontisto:pie-chart-2"></Icon>
        </button>
        <button :class="{ active: tab === 'bars' }" @click="tab = 'bars'">
          <Icon icon="raphael:barchart"></Icon>
        </button>
        <button :class="{ active: tab === 'pic' }" @click="tab = 'pic'">
          <Icon icon="fluent:grid-dots-28-filled"></Icon>
        </button>
      </div>
      <div class="chartframe">
        <div v-if="tab === 'text'" class="intext">
          <slot>Hier kan je de cijfers dmv tekst uitdrukken en toelichten.</slot>
        </div>
        <PieChart v-bind="props" v-if="tab === 'pie'" />
        <BasicBarChart v-bind="props" v-if="tab === 'bars'" />
        <PicChart v-bind="props" v-if="tab === 'pic'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const tab = ref('text')
const props = defineProps(['data', 'rows', 'labels', 'gap', 'button', 'buttontext'])

</script>

<style lang="less" scoped>
.combined-charts {
  .frame {
    width: var(--pwidth);
    max-width: 100%;
    margin: 0 auto 2rem;
    background: var(--bg2);
    border-radius: 0.25rem;
    overflow: hidden;
  }
}

.tabs {
  display: flex;
  padding: 0;
  background: var(--bg1);
  gap: 1px;
  overflow: hidden;

  button {
    margin: 0;
    flex: 1;
    background: transparent;
    border-radius: 0;
    padding: 0.75rem;
    color: var(--fg2);
    background: var(--bg3);
    line-height: 1;
    // border-radius: 0.25rem 0.25rem 0 0;

    &:hover {
      color: var(--fg);
    }

    &.active {
      color: var(--fg);
      background: var(--bg2);
    }
  }
}

.intext {
  min-height: 24rem;
  padding: 2rem;
}
</style>