<template>
  <div class="basic-bar-chart">
    <div class='frame'>
      <div class="bar">
        <div class="block" v-for="(item, k) in props.data"
          :style="{ width: ((item / props.data.reduce((a, b) => a + b, 0)) * 100) + '%' }" @mouseenter="highlight = k"
          @mouseleave="highlight = -1">
        </div>
      </div>
    </div>
    <ChartLabels :labels="props.labels" :highlight="highlight" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap', 'button', 'buttontext'])
const highlight = ref(-1)
</script>

<style lang="less" scoped>
.basic-bar-chart {
  .frame {
    padding: 2rem;
  }
}

.bar {
  width: 100%;
  display: flex;
  gap: 2px;
  border-radius: 0.25rem;
  overflow: hidden;
  height: 4rem;

  .block {
    cursor: pointer;
    transform: scaleX(0);
    animation: slidein 1s @easeOutExpo 0s 1 forwards;
    transform-origin: 0 0;

    @keyframes slidein {
      to {
        transform: scaleX(1);
      }
    }

    &:nth-child(1) {
      background: var(--fg);
    }

    &:nth-child(2) {
      background: var(--fg2);
    }

    &:nth-child(3) {
      background: var(--bg3);
    }
  }
}
</style>